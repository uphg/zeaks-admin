import type { FieldProps, LiteFieldDefinition, LiteFieldGroupProps, LiteFieldProps, UseFormProps } from './types'
import { useForm } from './use-form'

export function useFormLite(liteFields: LiteFieldProps[], options: UseFormProps = {}) {
  const fields = convertLiteFieldsToFields(liteFields)
  return useForm(fields, options)
}

function convertLiteFieldsToFields(liteFields: LiteFieldDefinition[]): FieldProps[] {
  const fields: FieldProps[] = []
  for (const liteField of liteFields) {
    if (isLiteFieldGroup(liteField)) {
      const [label, key, options] = liteField
      const { children } = options ?? {}
      if (!children) continue
      const convertedChildren = convertLiteFieldsToFields(children)
      fields.push({
        label,
        key,
        children: convertedChildren,
        ...(options as object || {}),
      })
    } else {
      const [label, key, props] = liteField
      fields.push({
        label,
        key,
        ...(props as object || {}),
      })
    }
  }

  return fields
}

function isLiteFieldGroup(field: LiteFieldDefinition): field is LiteFieldGroupProps {
  return Array.isArray(field) && !!field?.[2]?.children?.length
}
