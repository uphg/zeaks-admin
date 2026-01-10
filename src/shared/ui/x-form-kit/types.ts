import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, GridProps, InputNumberProps, InputProps, RadioGroupProps, RateProps, SelectOption, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'
import type { InputElement } from '@/shared/lib/form/types'
import type { MaybeRefOrGetter } from 'vue'

export type FieldAs = InputElement
export type FieldLabel = string | undefined | null
export type FieldKey = string | null
export interface FieldProps {
  label?: FieldLabel
  key?: FieldKey
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

export interface XFormulateProps {
  grid?: GridProps | boolean
  autoRules?: string[] | boolean
  [key: string]: any
}