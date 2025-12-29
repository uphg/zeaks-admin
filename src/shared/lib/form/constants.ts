import { camelize } from '@vue/shared'

export const selectTypes = ['select', 'tree-select', 'cascader', 'date', 'date-picker', 'time', 'time-picker', 'radio', 'radio-group', 'radio-button', 'radio-button-group', 'checkbox', 'checkbox-group', 'checkbox-button', 'checkbox-button-group', 'color-picker', 'switch', 'slider', 'rate', 'transfer', 'upload']
export const selectMultipleTypes = ['select', 'tree-select', 'cascader', 'checkbox', 'checkbox-group', 'checkbox-button', 'checkbox-button-group', 'transfer']
export const selectCamelTypes = selectTypes.map(item => camelize(item))
export const selectMultipleCamelTypes = selectMultipleTypes.map(item => camelize(item))
