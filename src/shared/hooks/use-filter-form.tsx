import type { FieldProps, UseFormProps } from "./use-form/types"
import { useForm } from "./use-form/use-form"

const defaultOptions: UseFormProps = {
  autoRules: false,
  showFeedback: false,
  grid: {
    xGap: 12, cols: 3
  }
}

export function useFilterForm(fields: FieldProps[], filterOptions: UseFormProps = {}) {
  const options = Object.assign(filterOptions, defaultOptions)
  const [Form, ...rest] = useForm(fields, options)
  return [
    () => (<Form />),
    ...rest
  ] as const
}