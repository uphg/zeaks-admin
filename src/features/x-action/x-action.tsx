import { computed, defineComponent, h, type PropType } from 'vue'
import type { ButtonProps, TagProps } from 'naive-ui'
import { NButton, NIcon } from 'naive-ui'
import { xActionMap, type ActionButtonType } from '@/shared/config/x-action'
import { omit } from 'lodash-es'

const customKeys = ['text', 'icon']

const XAction = defineComponent({
  props: {
    type: {
      type: String as PropType<ActionButtonType>,
      required: true,
    },
    text: String,
    onClick: Function as PropType<() => void>,
    disabled: Boolean,
    count: [String, Number],
    size: String as PropType<ButtonProps['size']>
  },
  setup(props, { slots }) {
    const action = computed(() => xActionMap[props.type])
    const text = computed(() => props.text ?? action.value?.text)
    const buttonProps = computed(() => omit(Object.assign({}, action.value, omit(props, 'type')), customKeys) as any)
    
    return () => (
      <NButton {...buttonProps.value}>
        {{
          icon: action.value.icon ? () => (
            <NIcon class="mr-1">
              {h(action.value.icon)}
            </NIcon>
          ) : null,
          default: slots.default ? slots.default : () => (
            props.type === 'batchDelete' ? `${text.value} (${props.count})` : text.value
          )
        }}
      </NButton>
    )
  },
})

export default XAction
