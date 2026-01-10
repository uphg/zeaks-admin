import { NCard } from "naive-ui"
import type { FieldProps, UseFormProps } from "./use-form/types"
import { useForm } from "./use-form/use-form"
import { iconMap } from "../lib/icon-map"

const defaultFormOptions: UseFormProps = {
  autoRules: false,
  showFeedback: false,
  grid: {
    xGap: 12,
    cols: '3 1000:4',
  }
}

interface filterOptions {
  onSearch(): void
  onReset(): void
}

export function useFilterForm(fields: FieldProps[], filterOptions: filterOptions = {}) {
  const formFields = [
    ...fields,
    { span: '1 1000:2', contentClass: 'flex gap-3 justify-end', children: [
      { as: 'button', text: '搜索', type: 'primary', icon: iconMap['search'], onClick: filterOptions.onSearch },
      { as: 'button', text: '重置', icon: iconMap['rotate-cw'], onClick: filterOptions.onReset },
    ] }
  ]
  const [Form, ...rest] = useForm(formFields, defaultFormOptions)
  return [
    () => (
      <NCard>
        <Form />
      </NCard>),
    ...rest
  ] as const
}