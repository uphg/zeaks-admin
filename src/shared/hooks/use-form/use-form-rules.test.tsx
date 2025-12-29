import { describe, expect, it } from 'vitest'
import { useFormLite } from './use-form-lite'

describe('form rules generation', () => {
  describe('input type rules', () => {
    it('should generate correct rules for input components', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['文本输入', 'input', { as: 'input' }],
        ['自动完成', 'autoComplete', { as: 'auto-complete' }],
        ['动态输入', 'dynamicInput', { as: 'dynamic-input' }],
      ], { autoRules: ['input', 'autoComplete', 'dynamicInput'] })

      const rules = _rules.value
      expect(rules).toBeDefined()
      expect(rules.input).toMatchObject({
        required: true,
        message: '请输入文本输入',
        trigger: ['blur', 'input'],
      })
      expect(rules.autoComplete).toMatchObject({
        required: true,
        message: '请输入自动完成',
        trigger: ['blur', 'input'],
      })
      expect(rules.dynamicInput).toMatchObject({
        required: true,
        message: '请输入动态输入',
        trigger: ['blur', 'input'],
      })
    })
  })

  describe('selection type rules', () => {
    it('should generate correct rules for select components', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['下拉选择', 'select', { as: 'select' }],
        ['树选择', 'treeSelect', { as: 'tree-select' }],
        ['级联选择', 'cascader', { as: 'cascader' }],
      ], { autoRules: ['select', 'treeSelect', 'cascader'] })

      const rules = _rules.value
      expect(rules.select).toMatchObject({
        required: true,
        message: '请选择下拉选择',
        trigger: ['blur', 'change'],
      })
      expect(rules.select.validator).toBeDefined()

      expect(rules.treeSelect).toMatchObject({
        required: true,
        message: '请选择树选择',
        trigger: ['blur', 'change'],
      })
      expect(rules.treeSelect.validator).toBeDefined()

      expect(rules.cascader).toMatchObject({
        required: true,
        message: '请选择级联选择',
        trigger: ['blur', 'change'],
      })
      expect(rules.cascader.validator).toBeDefined()
    })

    it('should generate correct rules for date/time components', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['日期', 'date', { as: 'date' }],
        ['日期选择', 'datePicker', { as: 'date-picker' }],
        ['时间', 'time', { as: 'time' }],
        ['时间选择', 'timePicker', { as: 'time-picker' }],
      ], { autoRules: ['date', 'datePicker', 'time', 'timePicker'] })

      const rules = _rules.value
      expect(rules.date).toMatchObject({
        required: true,
        message: '请选择日期',
        trigger: ['blur', 'change'],
      })
      expect(rules.datePicker).toMatchObject({
        required: true,
        message: '请选择日期选择',
        trigger: ['blur', 'change'],
      })
      expect(rules.time).toMatchObject({
        required: true,
        message: '请选择时间',
        trigger: ['blur', 'change'],
      })
      expect(rules.timePicker).toMatchObject({
        required: true,
        message: '请选择时间选择',
        trigger: ['blur', 'change'],
      })
    })

    it('should generate correct rules for radio components', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['单选', 'radio', { as: 'radio' }],
        ['单选组', 'radioGroup', { as: 'radio-group' }],
        ['单选按钮', 'radioButton', { as: 'radio-button' }],
        ['单选按钮组', 'radioButtonGroup', { as: 'radio-button-group' }],
      ], { autoRules: ['radio', 'radioGroup', 'radioButton', 'radioButtonGroup'] })

      const rules = _rules.value
      expect(rules.radio).toMatchObject({
        required: true,
        message: '请选择单选',
        trigger: ['blur', 'change'],
      })
      expect(rules.radioGroup).toMatchObject({
        required: true,
        message: '请选择单选组',
        trigger: ['blur', 'change'],
      })
      expect(rules.radioButton).toMatchObject({
        required: true,
        message: '请选择单选按钮',
        trigger: ['blur', 'change'],
      })
      expect(rules.radioButtonGroup).toMatchObject({
        required: true,
        message: '请选择单选按钮组',
        trigger: ['blur', 'change'],
      })
    })
  })

  describe('array type rules', () => {
    it('should generate correct rules for array components', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['复选框', 'checkbox', { as: 'checkbox' }],
        ['复选框组', 'checkboxGroup', { as: 'checkbox-group' }],
        ['复选框按钮', 'checkboxButton', { as: 'checkbox-button' }],
        ['复选框按钮组', 'checkboxButtonGroup', { as: 'checkbox-button-group' }],
        ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
        ['传输', 'transfer', { as: 'transfer' }],
        ['上传', 'upload', { as: 'upload' }],
      ], {
        autoRules: ['checkbox', 'checkboxGroup', 'checkboxButton', 'checkboxButtonGroup', 'dynamicTags', 'transfer', 'upload'],
      })

      const rules = _rules.value
      expect(rules.checkbox).toMatchObject({
        type: 'array',
        required: true,
        message: '请选择复选框',
        trigger: 'change',
      })
      expect(rules.checkboxGroup).toMatchObject({
        type: 'array',
        required: true,
        message: '请选择复选框组',
        trigger: 'change',
      })
      expect(rules.checkboxButton).toMatchObject({
        type: 'array',
        required: true,
        message: '请选择复选框按钮',
        trigger: 'change',
      })
      expect(rules.checkboxButtonGroup).toMatchObject({
        type: 'array',
        required: true,
        message: '请选择复选框按钮组',
        trigger: 'change',
      })
      expect(rules.dynamicTags).toMatchObject({
        type: 'array',
        required: true,
        message: '请输入动态标签',
        trigger: 'change',
      })
      expect(rules.transfer).toMatchObject({
        type: 'array',
        required: true,
        message: '请选择传输',
        trigger: 'change',
      })
      expect(rules.upload).toMatchObject({
        type: 'array',
        required: true,
        message: '请选择上传',
        trigger: 'change',
      })
    })
  })

  describe('number type rules', () => {
    it('should generate correct rules for number components', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['数字输入', 'inputNumber', { as: 'input-number' }],
        ['滑块', 'slider', { as: 'slider' }],
        ['评分', 'rate', { as: 'rate' }],
      ], { autoRules: ['inputNumber', 'slider', 'rate'] })

      const rules = _rules.value
      expect(rules.inputNumber).toMatchObject({
        type: 'number',
        required: true,
        message: '请输入数字输入',
        trigger: ['blur', 'change'],
      })
      console.log('rules.slider')
      console.log(rules.slider)
      expect(rules.slider).toMatchObject({
        type: 'number',
        required: true,
        message: '请选择滑块',
        trigger: ['blur', 'change'],
      })
      expect(rules.rate).toMatchObject({
        type: 'number',
        required: true,
        message: '请选择评分',
        trigger: ['blur', 'change'],
      })
    })
  })

  describe('boolean type rules', () => {
    it('should generate correct rules for switch component', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['开关', 'switch', { as: 'switch' }],
      ], { autoRules: ['switch'] })

      const rules = _rules.value
      expect(rules.switch).toMatchObject({
        type: 'boolean',
        required: true,
        message: '请选择开关',
        trigger: 'change',
      })
    })
  })

  describe('other type rules', () => {
    it('should generate correct rules for color-picker component', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['颜色选择', 'colorPicker', { as: 'color-picker' }],
      ], { autoRules: ['colorPicker'] })

      const rules = _rules.value
      expect(rules.colorPicker).toMatchObject({
        required: true,
        message: '请选择颜色选择',
        trigger: 'change',
      })
    })

    it('should generate default rules for unknown component types', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['未知类型', 'unknown', { as: 'unknown-type' as any }],
      ], { autoRules: ['unknown'] })

      const rules = _rules.value
      expect(rules.unknown).toMatchObject({
        required: true,
        message: '请输入未知类型',
        trigger: ['blur', 'input'],
      })
    })
  })

  describe('auto rules configuration', () => {
    it('should only generate rules for fields specified in autoRules', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['文本1', 'text1', { as: 'input' }],
        ['文本2', 'text2', { as: 'input' }],
        ['数字', 'number', { as: 'input-number' }],
      ], { autoRules: ['text1', 'number'] })

      const rules = _rules.value
      expect(rules.text1).toBeDefined()
      expect(rules.text2).toBeUndefined()
      expect(rules.number).toBeDefined()
    })

    it('should not generate rules when autoRules is not provided', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['文本', 'text', { as: 'input' }],
        ['数字', 'number', { as: 'input-number' }],
      ])

      const rules = _rules.value
      expect(Object.keys(rules)).toHaveLength(0)
    })

    it('should not generate rules when autoRules is empty', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['文本', 'text', { as: 'input' }],
        ['数字', 'number', { as: 'input-number' }],
      ], { autoRules: [] })

      const rules = _rules.value
      expect(Object.keys(rules)).toHaveLength(0)
    })
  })

  describe('custom rules priority', () => {
    it('should prioritize manually defined rules over auto-generated rules', () => {
      const customRule = {
        required: false,
        message: '自定义规则',
        trigger: 'input',
      }

      const [, { formRef, rules: _rules }] = useFormLite([
        ['文本', 'text', { as: 'input', rules: customRule }],
      ], { autoRules: ['text'] })

      const rules = _rules.value
      expect(rules.text).toEqual(customRule)
      expect(rules.text.required).toBe(false)
      expect(rules.text.message).toBe('自定义规则')
    })
  })

  describe('validator functionality', () => {
    it('should validate null, undefined and empty string values correctly for select types', () => {
      const [, { formRef, rules: _rules }] = useFormLite([
        ['选择', 'select', { as: 'select' }],
      ], { autoRules: ['select'] })

      const rules = _rules.value
      const validator = rules.select.validator

      // Test null value
      expect(validator(null, null)).toBeInstanceOf(Error)
      // Test undefined value
      expect(validator(null, undefined)).toBeInstanceOf(Error)
      // Test empty string
      expect(validator(null, '')).toBeInstanceOf(Error)
      // Test valid value
      expect(validator(null, 'valid')).toBe(true)
    })
  })

  describe('nested field rules', () => {
    it('should handle nested field paths correctly', () => {
      const [,{ formRef, rules: _rules }] = useFormLite([
        ['嵌套字段', 'user.name', { as: 'input' }],
        ['深层嵌套', 'user.profile.email', { as: 'input' }],
      ], { autoRules: ['user.name', 'user.profile.email'] })

      const rules = _rules.value
      expect(rules.user?.name).toBeDefined()
      expect(rules.user?.profile?.email).toBeDefined()
      expect(rules.user.name).toMatchObject({
        required: true,
        message: '请输入嵌套字段',
        trigger: ['blur', 'input'],
      })
      expect(rules.user.profile.email).toMatchObject({
        required: true,
        message: '请输入深层嵌套',
        trigger: ['blur', 'input'],
      })
    })
  })
})
