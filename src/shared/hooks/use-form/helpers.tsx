import type { FormRules, SelectOption } from 'naive-ui'
import type { FieldProps, UseFormProps } from './types'
import type { CamelInputElement, InputElement } from '@/shared/lib/form/types'
import { isObject } from '@vueuse/core'
import { omit, pick } from 'lodash-es'
import { NAutoComplete, NButton, NCascader, NCheckbox, NCheckboxGroup, NColorPicker, NDatePicker, NDynamicInput, NDynamicTags, NFormItem, NFormItemGi, NGrid, NInput, NInputNumber, NRadio, NRadioButton, NRadioGroup, NRate, NSelect, NSlider, NSwitch, NTimePicker, NTransfer, NTreeSelect, NUpload } from 'naive-ui'
// import { getDefaultValue, getFieldRuleConfig, setNestedRule } from '@/utils/form'
import { nFormItemPropNames } from './common'
import { selectTypes } from '@/shared/config/form'
import { toValue, type MaybeRefOrGetter, type Ref } from 'vue'

export function renderFields(fields: FieldProps[], itemsNodeMap: Map<string, any>, isGrid: boolean) {
  return fields?.map((field, index) => {
    const FormItem = isGrid ? NFormItemGi : NFormItem
    if (isNestedField(field)) {
      const { label, children: nestedFields, ...props } = field
      return (
        <FormItem key={index} label={label!}>
          {nestedFields && (
            props?.grid
              ? (
                  <NGrid {...props.grid}>
                    {nestedFields.map(({ label, key, ...props }) => {
                      const Input = itemsNodeMap.get(key)
                      return (
                        <NFormItemGi {...pick(props, nFormItemPropNames)} key={key} path={key} label={label!}>
                          {Input}
                        </NFormItemGi>
                      )
                    })}
                  </NGrid>
                )
              : (
                  nestedFields.map(({ label, key, ...props }) => {
                    const Input = itemsNodeMap.get(key)
                    return (
                      <NFormItem {...pick(props, nFormItemPropNames)} key={key} path={key} label={label!}>
                        {Input}
                      </NFormItem>
                    )
                  })
                )
          )}
        </FormItem>
      )
    } else {
      const { label, key, ...props } = field
      const Input = itemsNodeMap.get(key)
      return (
        <FormItem {...pick(props, nFormItemPropNames)} key={key} path={key} label={label!}>
          {Input}
        </FormItem>
      )
    }
  })
}

// 处理可能的响应式 options 值
function processOptions<T extends unknown>(options?: MaybeRefOrGetter<T[]>): T[] | undefined
function processOptions<T extends SelectOption>(options?: MaybeRefOrGetter<T[]>) {
  if (options === undefined) return undefined
  return toValue(options)
}

export function createItemNodeMap(fields: FieldProps[], form: Ref<Record<string, any>>) {
  const flattenedFields = flattenFields(fields)
  const map = new Map()

  flattenedFields.forEach((field, index) => {
    const { key } = field
    const node = createItemNode(field, form)
    map.set(key, node)
  })

  return {
    itemsNodeMap: map,
    flattenedFields,
  }

  function createItemNode(field: FieldProps, form: Ref<Record<string, any>>) {
    const { label, key, ..._props } = field
    const propsData = omit(_props || {}, 'children')
    const { as: tag = 'input', placeholder, ...restProps } = propsData
    if (!key) return

    const modelKey = tag === 'upload' ? 'fileList' : 'value'
    const onUpdateValue = (value: any) => {
      form.value[key] = value
    }

    let InputElement
    switch (tag) {
      case 'input':
        InputElement = () => (
          <NInput
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'input-number':
        InputElement = () => (
          <NInputNumber
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'select':
        InputElement = () => (
          <NSelect
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
            options={processOptions(restProps.options)}
          />
        )
        break
      case 'date':
      case 'date-picker':
        InputElement = () => (
          <NDatePicker
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break
      case 'time':
      case 'time-picker':
        InputElement = () => (
          <NTimePicker
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'switch':
        InputElement = () => (
          <NSwitch
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'slider':
        InputElement = () => (
          <NSlider
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'checkbox':
      case 'checkbox-group': {
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NCheckboxGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {processOptions<SelectOption>(options)?.map((option: SelectOption) => (
              <NCheckbox key={option.value} value={option.value}>
                {option.label}
              </NCheckbox>
            ))}
          </NCheckboxGroup>
        )
        break
      }

      case 'radio':
      case 'radio-group':{
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NRadioGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {processOptions<SelectOption>(options)?.map((option: SelectOption) => (
              <NRadio key={option.value} value={option.value}>
                {option.label}
              </NRadio>
            ))}
          </NRadioGroup>
        )
        break
      }

      case 'radio-button':
      case 'radio-button-group': {
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NRadioGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {processOptions<SelectOption>(options)?.map((option: SelectOption) => (
              <NRadioButton key={option.value} value={option.value}>
                {option.label}
              </NRadioButton>
            ))}
          </NRadioGroup>
        )
        break
      }

      case 'auto-complete':
        InputElement = () => (
          <NAutoComplete
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'cascader':
        InputElement = () => (
          <NCascader
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
            options={processOptions(restProps.options)}
          />
        )
        break

      case 'color-picker':
        InputElement = () => (
          <NColorPicker
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'dynamic-input':
        InputElement = () => (
          <NDynamicInput
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'dynamic-tags':
        InputElement = () => (
          <NDynamicTags
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'checkbox-button':
      case 'checkbox-button-group': {
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NCheckboxGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {processOptions<SelectOption>(options)?.map((option: SelectOption) => (
              <NCheckbox key={option.value} value={option.value}>
                {option.label}
              </NCheckbox>
            ))}
          </NCheckboxGroup>
        )
        break
      }

      case 'rate':
        InputElement = () => (
          <NRate
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'tree-select':
        InputElement = () => (
          <NTreeSelect
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
            options={processOptions(restProps.options)}
          />
        )
        break

      case 'upload':
        InputElement = () => (
          <NUpload
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'transfer':
        InputElement = () => (
          <NTransfer
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            options={processOptions(restProps.options)}
          />
        )
        break

      case 'button': {
        const { text, render, ...otherProps } = restProps
        InputElement = () => (
          <NButton {...otherProps}>
            {render ? render() : text}
          </NButton>
        )
        break
      }
      default:
        InputElement = () => (
          <NInput
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
    }
    return InputElement
  }
}

export function createDefaultField(flattenedFields: FieldProps[]) {
  const defaultField: Record<string, any> = {}
  flattenedFields.forEach(({ label, key, ...props }) => {
    if (!key) return
    // 已经手动设置了默认值的字段不再处理
    if (props?.defaultValue !== void 0) {
      defaultField[key] = props.defaultValue
      return
    }
    const tag = props?.as || 'input'
    defaultField[key] = getDefaultValue(tag, props)
  })
  return defaultField
}

export function createFormRules(fields: FieldProps[], options: UseFormProps = {}) {
  const rules: FormRules = {}

  fields.forEach(({ label, key, ...props }) => {
    // 优先使用手动传入的规则
    if (!key) return
    if (isObject(props?.rules)) {
      rules[key] = props.rules
      return
    }

    // 只有在 autoRules 中包含该字段时才生成规则
    if (!options.autoRules?.includes(key)) {
      return
    }

    const tag = props?.as || 'input'
    const ruleConfig = getFieldRuleConfig(tag, { label })

    if (ruleConfig) {
      // 处理嵌套字段
      if (key.includes('.')) {
        setNestedRule(rules, key, ruleConfig)
      } else {
        rules[key] = ruleConfig
      }
    }
  })

  return rules
}

function isNestedField(field: FieldProps) {
  return Array.isArray(field.children)
}

function flattenFields(fields: FieldProps[]): FieldProps[] {
  const flattened: FieldProps[] = []
  if (!fields?.length) return []

  fields.forEach((field) => {
    if (isNestedField(field)) {
      const { label, children: nestedFields } = field
      nestedFields?.forEach(({ key, props }) => {
        flattened.push({ label, key, props })
      })
    } else {
      flattened.push(field)
    }
  })

  return flattened
}

const arrDateTypes = ['daterange', 'datetimerange', 'monthrange', 'yearrange', 'quarterrange']

export function getFieldRuleConfig(tag: InputElement | CamelInputElement, { label, multiple }: { label?: string | null, multiple?: boolean }) {
  const baseRule = {
    required: true,
    message: selectTypes.includes(tag) ? `请选择${label}` : `请输入${label}`,
  }

  switch (tag) {
    case 'input':
    case 'dynamic-input':
    case 'auto-complete':
      return {
        ...baseRule,
        trigger: ['blur', 'input'],
      }
    case 'select':
    case 'tree-select':
    case 'cascader':
    case 'date':
    case 'date-picker':
    case 'time':
    case 'time-picker':
    case 'radio':
    case 'radio-group':
    case 'radio-button':
    case 'radio-button-group':
      return {
        ...baseRule,
        trigger: ['blur', 'change'],
        validator: (_rule: any, value: any) => {
          if (value === null || value === undefined || value === '') {
            return new Error(baseRule.message)
          }
          return true
        },
      }

    case 'checkbox':
    case 'checkbox-group':
    case 'dynamic-tags':
    case 'transfer':
    case 'upload':
      return {
        type: 'array' as const,
        ...baseRule,
        trigger: 'change',
      }

    case 'input-number':
      return {
        type: 'number' as const,
        ...baseRule,
        trigger: ['blur', 'change'],
      }

    case 'switch':
      return {
        type: 'boolean' as const,
        ...(baseRule),
        trigger: 'change',
      }

    case 'slider':
    case 'rate':
      return {
        type: 'number' as const,
        ...baseRule,
        trigger: ['blur', 'change'],
      }

    case 'color-picker':
      return {
        ...baseRule,
        trigger: 'change',
      }

    default:
      return {
        ...baseRule,
        trigger: ['blur', 'input'],
      }
  }
}

export function setNestedRule(rules: FormRules, path: string, ruleConfig: any) {
  const keys = path.split('.')
  let current: any = rules

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key]
  }

  const lastKey = keys[keys.length - 1]!
  current[lastKey] = ruleConfig
}

export function hasNestedRule(rules: FormRules, path: string): boolean {
  const keys = path.split('.')
  let current: any = rules

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]!
    if (!current[key]) {
      return false
    }
    current = current[key]
  }

  return true
}

interface DefaultValueProps {
  multiple?: boolean
  min?: number
  length?: number
  defaultValue?: any
  type?: string
  [key: string]: any
}

export function getDefaultValue(tag: InputElement, props?: DefaultValueProps) {
  if (props?.defaultValue) return props.defaultValue
  switch (tag) {
    case 'checkbox':
    case 'checkbox-group':
    case 'transfer':
    case 'dynamic-tags':
    case 'upload':
    case 'dynamic-input':
      return []
    case 'switch':
      return false
    case 'select':
    case 'tree-select':
    case 'cascader':
      return props?.multiple ? [] : null
    case 'input-number':
    case 'slider':
    case 'rate':
      return props?.min || 0
    case 'input-otp':
      return Array.from({ length: props?.length ?? 6 }).fill('')
    case 'date':
    case 'date-picker':
      return arrDateTypes.includes(props!.type!) ? [] : null
    default:
    // default value：
    // 'input'
    // 'radio'
    // 'mention'
    // 'date'
    // 'date-picker'
    // 'time'
    // 'time-picker'
    // 'color-picker'
    // 'auto-complete'
      return null
  }
}

