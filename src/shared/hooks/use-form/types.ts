import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, GridProps, InputNumberProps, InputProps, RadioGroupProps, RateProps, SelectOption, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'
import type { InputElement } from '@/shared/lib/form/types'
import type { MaybeRefOrGetter } from 'vue'

export type FieldAs = InputElement
export type FieldLabel = string | undefined | null
export type FieldKey = string | null
export interface FieldProps {
  label: FieldLabel
  key: FieldKey
  as?: FieldAs
  children?: FieldProps[]
  [key: string]: any
}
export interface LiteFieldRestProps {
  as?: FieldAs
  children?: LiteFieldDefinition[]
  [key: string]: any
}

export interface LiteFieldGroupOptions extends LiteFieldRestProps {
  grid?: GridProps
}
export type LiteFieldGroupProps = [FieldLabel, FieldKey | null, LiteFieldGroupOptions?]
export type LiteFieldProps = [FieldLabel, FieldKey, LiteFieldRestProps?]
export type LiteFieldDefinition = LiteFieldProps | LiteFieldGroupProps
export type FieldInputProps = Omit<FieldProps, 'label' | 'key' | 'children'>

export interface UseFormProps {
  autoRules?: string[] | boolean
  grid?: GridProps | boolean
  [key: string]: any
}

interface FieldPropsMap {
  'auto-complete': Partial<AutoCompleteProps> & { as?: 'auto-complete' }
  'cascader': Partial<CascaderProps> & { as?: 'cascader', options?: MaybeRefOrGetter<SelectOption[]> }
  'color-picker': Partial<ColorPickerProps> & { as?: 'color-picker' }
  'checkbox': Partial<CheckboxGroupProps> & { as?: 'checkbox', options?: MaybeRefOrGetter<SelectOption[]> }
  'checkbox-button': Partial<CheckboxGroupProps> & { as?: 'checkbox-button', options?: MaybeRefOrGetter<SelectOption[]> }
  'checkbox-group': Partial<CheckboxGroupProps> & { as?: 'checkbox-group', options?: MaybeRefOrGetter<SelectOption[]> }
  'checkbox-button-group': Partial<CheckboxGroupProps> & { as?: 'checkbox-button-group', options?: MaybeRefOrGetter<any[]> }
  'date': Partial<DatePickerProps> & { as?: 'date' }
  'date-picker': Partial<DatePickerProps> & { as?: 'date-picker' }
  'dynamic-input': Partial<DynamicInputProps> & { as?: 'dynamic-input' }
  'dynamic-tags': Partial<DynamicTagsProps> & { as?: 'dynamic-tags' }
  'input': Partial<InputProps> & { as?: 'input' }
  'input-number': Partial<InputNumberProps> & { as?: 'input-number' }
  'radio': Partial<RadioGroupProps> & { as?: 'radio', options?: MaybeRefOrGetter<SelectOption[]> }
  'radio-group': Partial<RadioGroupProps> & { as?: 'radio-group', options?: MaybeRefOrGetter<SelectOption[]> }
  'radio-button': Partial<RadioGroupProps> & { as?: 'radio-button', options?: MaybeRefOrGetter<SelectOption[]> }
  'radio-button-group': Partial<RadioGroupProps> & { as?: 'radio-button-group', options?: MaybeRefOrGetter<SelectOption[]> }
  'switch': Partial<SwitchProps> & { as?: 'switch' }
  'rate': Partial<RateProps> & { as?: 'rate' }
  'select': Partial<SelectProps> & { as?: 'select', options?: MaybeRefOrGetter<SelectOption[]> }
  'slider': Partial<SliderProps> & { as?: 'slider' }
  'time': Partial<TimePickerProps> & { as?: 'time' }
  'time-picker': Partial<TimePickerProps> & { as?: 'time-picker' }
  'transfer': Partial<TransferProps> & { as?: 'transfer', options?: MaybeRefOrGetter<any[]> }
  'tree-select': Partial<TreeSelectProps> & { as?: 'tree-select', options?: MaybeRefOrGetter<SelectOption[]> }
  'upload': Partial<UploadProps> & { as?: 'upload' }
}
