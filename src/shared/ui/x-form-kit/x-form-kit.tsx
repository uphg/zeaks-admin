import { computed, defineComponent, ref, shallowRef, type ExtractPropTypes, type PropType } from "vue"
import { actionNodeTags, createDefaultField, createFormRules, createItemNodeMap, isUnbindItem, renderFields } from "./helpers"
import { formProps, NForm, NGrid, type GridProps } from "naive-ui"
import { assign, isNil, isObject, omit } from "lodash-es"
import type { FormValidateCallback, ShouldRuleBeApplied } from "naive-ui/es/form/src/interface"
import type { FieldProps } from "./types"
import type { FormKitStore } from "./props"

export type XFormKitProps = ExtractPropTypes<typeof formKitProps>

const customProps = {
  store: Object as PropType<FormKitStore>,
  grid: [String, Boolean, Object] as PropType<GridProps | boolean>,
  autoRules: [Array, Boolean] as PropType<string[] | boolean>,
  fields: {
    type: [Array] as PropType<FieldProps[]>,
    default: () => []
  }
}

const customOptionNames = Object.keys(customProps)

const formKitProps = {
  ...formProps,
  ...customProps
}

const XFormKit = defineComponent({
  props: formKitProps,
  setup(props) {
    if (!props.store) return
    const { form, formRef, rules } = props.store
    const { itemsNodeMap, flattenedFields } = createItemNodeMap(props.fields, form)
    const formProps = computed(() => assign({}, omit(props, customOptionNames)))
    const isGrid = computed(() => !!props?.grid)
    const gridProps = computed(() => isObject(props?.grid) ? props.grid : {})
    const defaultField = createDefaultField(flattenedFields)

    flattenedFields.forEach((field) => {
      const { key } = field
      if (isNil(key)) return
      if (isUnbindItem(field)) return
      form.value[key] = defaultField[key]
    })  
    rules.value = createFormRules(flattenedFields, props)
    assign(props.store, { resetForm, setFields, resetFields, validate, resetValidation })

    return () => {
      const FormItems = renderFields(props.fields, itemsNodeMap, isGrid.value)
      return (
        <NForm
          {...formProps.value}
          ref={formRef}
          model={form.value}
          rules={rules.value}
        >
          {isGrid.value ? <NGrid {...gridProps.value}>{FormItems}</NGrid> : FormItems}
        </NForm>
      )
    }

    function resetForm() {
      resetFields()
      resetValidation()
    }
  
    function resetFields() {
      const defaultValue = createDefaultField(flattenedFields)
      setFields(defaultValue)
    }
  
    function setFields(fields: Partial<Record<string, any>>) {
      Object.keys(fields).forEach((key) => {
        form.value[key] = fields[key]
      })
    }
  
    async function validate(callback?: FormValidateCallback, shouldRuleBeApplied?: ShouldRuleBeApplied) {
      return formRef.value?.validate(callback, shouldRuleBeApplied)
    }
  
    function resetValidation() {
      formRef.value?.restoreValidation()
    }
  }
})

export default XFormKit