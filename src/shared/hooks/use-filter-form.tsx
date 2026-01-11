import { NCard } from "naive-ui"
import type { FieldProps } from "./use-form/types"
import { iconMap } from "@/shared/lib/icon-map"
import XFormKit, { type XFormKitProps } from '@/shared/ui/x-form-kit/x-form-kit'
import { useFormKitStore } from "@/shared/ui/x-form-kit/use-form-kit-store"

const defaultProps: Partial<XFormKitProps> = {
  labelPlacement: 'left',
  autoRules: false,
  showFeedback: false,
  grid: {
    xGap: 12,
    cols: '3 1000:4',
  },
}

interface FilterOptions {
  onSearch?: () => void
  onReset?: () => void
}

export function useFilterForm(fields: FieldProps[], filterOptions: FilterOptions = {}) {
  const formKitStore = useFormKitStore()
  const formFields = [
    ...fields,
    { span: '1 1000:2', contentClass: 'flex gap-3 justify-end', children: [
      { as: 'button', text: '搜索', type: 'primary', icon: iconMap['search'], onClick: filterOptions.onSearch },
      { as: 'button', text: '重置', icon: iconMap['rotate-cw'], onClick: filterOptions.onReset },
    ] }
  ]
  return [
    () => (
      <NCard>
        <XFormKit store={formKitStore} fields={formFields} {...defaultProps}/>
      </NCard>),
    formKitStore
  ] as const
}