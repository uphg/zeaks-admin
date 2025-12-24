import type { MouseEventHandler } from '@/shared/lib/utility-types'
import { defineComponent, type PropType } from 'vue'
import Tag from '@/shared/ui/x-tag/x-tag'

const NavTag = defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    closable: Boolean,
    onClick: Function as PropType<MouseEventHandler>,
    onClose: Function as PropType<MouseEventHandler>,
  },
  setup(props, { slots }) {
    return () => {
      const { active, closable, onClick, onClose } = props

      return (
        <Tag hue={active ? 'blue' : ''} closable={closable} onClick={onClick} onClose={onClose}>
          <span>{slots.default?.()}</span>
        </Tag>
      )
    }
  },
})

export default NavTag
