import { defineComponent } from 'vue'
import type { FormItemRule } from 'naive-ui'
import { NFormItem } from 'naive-ui'

interface XFormItemProps {
  label?: string
  path?: string
  rule?: FormItemRule | FormItemRule[]
  required?: boolean
  showLabel?: boolean
  showRequireMark?: boolean
  requireMarkPlacement?: 'left' | 'right'
}

const XFormItem = defineComponent<XFormItemProps>({
  name: 'XFormItem',
  props: {
    label: String,
    path: String,
    rule: [Object, Array],
    required: Boolean,
    showLabel: {
      type: Boolean,
      default: true,
    },
    showRequireMark: {
      type: Boolean,
      default: true,
    },
    requireMarkPlacement: {
      type: String as any,
      default: 'right',
    },
  },
  setup(props, { slots }) {
    return () => (
      <NFormItem
        label={props.label}
        path={props.path}
        rule={props.rule}
        required={props.required}
        show-label={props.showLabel}
        show-require-mark={props.showRequireMark}
        require-mark-placement={props.requireMarkPlacement}
      >
        {slots.default?.()}
      </NFormItem>
    )
  },
})

export default XFormItem