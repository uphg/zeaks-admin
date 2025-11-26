import { defineComponent, type PropType } from '@/shared/ui/vue-imports'
import { mergeClass } from '@/shared/lib'

const PureButton = defineComponent({
  props: {
    class: {
      type: [String, Array, Object] as PropType<string | (string | Array<string> | Record<string, boolean>)[] | Record<string, boolean>>,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    return () => (
      <button
        {...props}
        class={mergeClass('text-black rounded-3px border-none bg-transparent cursor-pointer transition-colors duration-300 focus:outline-none active:bg-neutral-800/13 focus:bg-neutral-800/9 hover:bg-neutral-800/9', props.class)}
      >
        {slots.default?.()}
      </button>
    )
  },
})

export default PureButton