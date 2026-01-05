import { computed, defineComponent, type PropType } from 'vue'
import { NButton, NIcon, type ButtonProps } from 'naive-ui'
import { xActionMap, type ActionButtonType, type NButtonType } from '@/shared/config/x-action'

const XTextAction = defineComponent({
  props: {
    type: {
      type: String as PropType<ActionButtonType>,
      required: true,
    },
    hue: String as PropType<NButtonType>,
    text: String,
    onClick: Function as PropType<() => void>,
    disabled: Boolean,
    count: [String, Number],
  },
  setup(props, { slots }) {
    const action = xActionMap[props.type]
    const type = computed(() => (action.type ?? props.hue) as ButtonProps['type'])
    const text = computed(() => props.text ?? action.text)
    return () => (
      <NButton type={type.value} onClick={props.onClick} disabled={props.disabled} quaternary text>
        { slots.default
          ? slots.default()
          : (
              <>
                <NIcon class="mr-1">
                  <action.icon />
                </NIcon>
                {props.type === 'batchDelete' ? `${text}(${props.count})` : text}
              </>
            )}
      </NButton>
    )
  },
})

export default XTextAction
