import { computed, defineComponent, type PropType } from 'vue'
import { NButton, NDropdown, NIcon, NSpace } from 'naive-ui'
import IconMoreHorizontal from '~icons/lucide/more-horizontal'
import XAction from '../x-action/x-action'
import { xActionMap } from '@/shared/config/x-action'

interface Action {
  type: 'create' | 'update' | 'delete' | 'import' | 'export' | 'preview'
  text?: string
  onClick?: () => void
}

const XActionGroup = defineComponent({
  props: {
    actions: {
      type: Array as PropType<Action[]>,
      required: true,
    },
  },
  setup(props) {
    const visibleActions = computed(() => props.actions.slice(0, 3))
    const dropdownActions = computed(() => props.actions.slice(3))

    const getIcon = (type: string) => {
      const IconComponent = xActionMap[type].icon
      return () => <NIcon><IconComponent /></NIcon>
    }

    const options = computed(() =>
      dropdownActions.value.map((action, index) => ({
        label: action.text || xActionMap[action.type].text,
        key: index.toString(),
        icon: getIcon(action.type),
      })),
    )

    const handleSelect = (key: string) => {
      const index = Number.parseInt(key, 10)
      dropdownActions.value[index]?.onClick?.()
    }

    return () => {
      if (props.actions.length <= 3) {
        return (
          <NSpace>
            {props.actions.map((action, index) => (
              <XAction key={index} {...action} />
            ))}
          </NSpace>
        )
      } else {
        return (
          <NSpace>
            {visibleActions.value.map((action, index) => (
              <XAction key={index} {...action} />
            ))}
            <NDropdown
              options={options.value}
              onSelect={handleSelect}
              trigger="click"
              placement="bottom-end"
            >
              <NButton>
                <NIcon class="mr-1">
                  <IconMoreHorizontal />
                </NIcon>
                更多
              </NButton>
            </NDropdown>
          </NSpace>
        )
      }
    }
  },
})

export default XActionGroup
