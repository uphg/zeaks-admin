import { pick } from "lodash-es";
import { NSwitch, switchProps, type SwitchProps } from "naive-ui";
import { defineComponent, type PropType } from "vue";

type SwitchState = [string | number | boolean, any];

const nSwitchKeys = Object.keys(switchProps).filter(item => !['checkedValue', 'uncheckedValue'].includes(item))

const XStateSwitch = defineComponent({
  props: {
    ...switchProps,
    checked: {
      type: Object as PropType<SwitchState>,
      validator: (val: any): val is SwitchState => 
        Array.isArray(val) && val.length === 2,
      default: () => [true, null] as SwitchState
    },
    unchecked: {
      type: Object as PropType<SwitchState>,
      validator: (val: any): val is SwitchState => 
        Array.isArray(val) && val.length === 2,
      default: () => [false, null] as SwitchState
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return () => (
      <NSwitch 
        checkedValue={props.checked[0]} 
        uncheckedValue={props.unchecked[0]}
        {...pick(props, nSwitchKeys)}
        onUpdate:value={onUpdateValue}
      >
        {{
          checked: () => props.checked[1],
          unchecked: () => props.unchecked[1]
        }}
      </NSwitch>
    );
    
    function onUpdateValue(value: SwitchProps['value']) {
      emit('update:value', value)
    }
  }

});

export default XStateSwitch