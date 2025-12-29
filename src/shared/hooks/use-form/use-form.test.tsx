import type { FormItemRule } from 'naive-ui'
import { describe, expect, it } from 'vitest'
import { useForm } from './use-form'

describe('useForm', () => {
  describe('form data initialization', () => {
    it('should initialize form data with correct default values for input components', () => {
      const [, { form }] = useForm([
        { label: '文本', key: 'text', as: 'input' },
        { label: '自动完成', key: 'autoComplete', as: 'auto-complete' },
      ])

      expect(form.value.text).toBe(null)
      expect(form.value.autoComplete).toBe(null)
    })

    it('should initialize form data with correct default values for number components', () => {
      const [, { form }] = useForm([
        { label: '数字', key: 'number', as: 'input-number' },
        { label: '滑块', key: 'slider', as: 'slider' },
        { label: '评分', key: 'rate', as: 'rate' },
      ])

      expect(form.value.number).toBe(0)
      expect(form.value.slider).toBe(0)
      expect(form.value.rate).toBe(0)
    })

    it('should initialize form data with correct default values for boolean components', () => {
      const [, { form }] = useForm([
        { label: '开关', key: 'switch', as: 'switch' },
      ])

      expect(form.value.switch).toBe(false)
    })

    it('should initialize form data with correct default values for selection components', () => {
      const [, { form }] = useForm([
        { label: '选择', key: 'select', as: 'select' },
        { label: '多选', key: 'multiSelect', as: 'select', multiple: true },
        { label: '级联', key: 'cascader', as: 'cascader' },
        { label: '树选择', key: 'treeSelect', as: 'tree-select' },
      ])

      expect(form.value.select).toBe(null)
      expect(form.value.multiSelect).toEqual([])
      expect(form.value.cascader).toBe(null)
      expect(form.value.treeSelect).toBe(null)
    })

    it('should initialize form data with correct default values for date/time components', () => {
      const [, { form }] = useForm([
        { label: '日期', key: 'date', as: 'date-picker' },
        { label: '时间', key: 'time', as: 'time-picker' },
        { label: '颜色', key: 'color', as: 'color-picker' },
      ])

      expect(form.value.date).toBe(null)
      expect(form.value.time).toBe(null)
      expect(form.value.color).toBe(null)
    })

    it('should initialize form data with correct default values for array components', () => {
      const [, { form }] = useForm([
        { label: '复选框', key: 'checkbox', as: 'checkbox-group' },
        { label: '复选框按钮', key: 'checkboxButton', as: 'checkbox-button-group' },
        { label: '传输', key: 'transfer', as: 'transfer' },
        { label: '上传', key: 'upload', as: 'upload' },
        { label: '动态输入', key: 'dynamicInput', as: 'dynamic-input' },
        { label: '动态标签', key: 'dynamicTags', as: 'dynamic-tags' },
      ])

      expect(form.value.checkbox).toEqual([])
      expect(form.value.checkboxButton).toEqual([])
      expect(form.value.transfer).toEqual([])
      expect(form.value.upload).toEqual([])
      expect(form.value.dynamicInput).toEqual([])
      expect(form.value.dynamicTags).toEqual([])
    })

    it('should initialize with custom min values', () => {
      const [, { form }] = useForm([
        { label: '数字', key: 'number', as: 'input-number', min: 10 },
        { label: '滑块', key: 'slider', as: 'slider', min: 5 },
        { label: '评分', key: 'rate', as: 'rate', min: 1 },
      ])

      expect(form.value.number).toBe(10)
      expect(form.value.slider).toBe(5)
      expect(form.value.rate).toBe(1)
    })
  })

  describe('form component types coverage', () => {
    it('should support all FieldAs component types', () => {
      const [, { form }] = useForm([
      // Text input types
        { label: '输入框', key: 'input', as: 'input' },
        { label: '自动完成', key: 'autoComplete', as: 'auto-complete' },

        // Number input types
        { label: '数字输入', key: 'inputNumber', as: 'input-number' },
        { label: '滑块', key: 'slider', as: 'slider' },
        { label: '评分', key: 'rate', as: 'rate' },

        // Selection types
        { label: '下拉选择', key: 'select', as: 'select' },
        { label: '级联选择', key: 'cascader', as: 'cascader' },
        { label: '树选择', key: 'treeSelect', as: 'tree-select' },

        // Date/Time types
        { label: '日期选择', key: 'datePicker', as: 'date-picker' },
        { label: '时间选择', key: 'timePicker', as: 'time-picker' },

        // Boolean types
        { label: '开关', key: 'switch', as: 'switch' },

        // Multiple selection types
        { label: '复选框组', key: 'checkboxGroup', as: 'checkbox-group' },
        { label: '复选框按钮组', key: 'checkboxButtonGroup', as: 'checkbox-button-group' },
        { label: '单选框组', key: 'radioGroup', as: 'radio-group' },
        { label: '单选按钮组', key: 'radioButtonGroup', as: 'radio-button-group' },

        // Other types
        { label: '颜色选择', key: 'colorPicker', as: 'color-picker' },
        { label: '传输框', key: 'transfer', as: 'transfer' },
        { label: '上传', key: 'upload', as: 'upload' },
        { label: '动态输入', key: 'dynamicInput', as: 'dynamic-input' },
        { label: '动态标签', key: 'dynamicTags', as: 'dynamic-tags' },
      ])

      // Verify all form fields are initialized
      const fieldKeys = [
        'input',
        'autoComplete',
        'inputNumber',
        'slider',
        'rate',
        'select',
        'cascader',
        'treeSelect',
        'datePicker',
        'timePicker',
        'switch',
        'checkboxGroup',
        'checkboxButtonGroup',
        'radioGroup',
        'radioButtonGroup',
        'colorPicker',
        'transfer',
        'upload',
        'dynamicInput',
        'dynamicTags',
      ]

      fieldKeys.forEach((key) => {
        expect(form.value).toHaveProperty(key)
      })

      // Verify specific default values
      expect(form.value.input).toBe(null)
      expect(form.value.autoComplete).toBe(null)
      expect(form.value.inputNumber).toBe(0)
      expect(form.value.slider).toBe(0)
      expect(form.value.rate).toBe(0)
      expect(form.value.select).toBe(null)
      expect(form.value.cascader).toBe(null)
      expect(form.value.treeSelect).toBe(null)
      expect(form.value.datePicker).toBe(null)
      expect(form.value.timePicker).toBe(null)
      expect(form.value.switch).toBe(false)
      expect(form.value.checkboxGroup).toEqual([])
      expect(form.value.checkboxButtonGroup).toEqual([])
      expect(form.value.radioGroup).toBe(null)
      expect(form.value.radioButtonGroup).toBe(null)
      expect(form.value.colorPicker).toBe(null)
      expect(form.value.transfer).toEqual([])
      expect(form.value.upload).toEqual([])
      expect(form.value.dynamicInput).toEqual([])
      expect(form.value.dynamicTags).toEqual([])
    })
  })

  describe('form methods', () => {
    it('should reset form to default values', () => {
      const [, form, { resetFields }] = useForm([
        { label: '文本', key: 'text', as: 'input' },
        { label: '数字', key: 'number', as: 'input-number' },
        { label: '开关', key: 'switch', as: 'switch' },
        { label: '选择', key: 'select', as: 'select', multiple: true },
        { label: '复选框', key: 'checkbox', as: 'checkbox-group' },
      ])

      // Modify form values
      form.value.text = 'modified'
      form.value.number = 100
      form.value.switch = true
      form.value.select = ['option1']
      form.value.checkbox = ['value1']

      // Reset form
      resetFields()

      // Check if values are reset to defaults
      expect(form.value.text).toBe(null)
      expect(form.value.number).toBe(0)
      expect(form.value.switch).toBe(false)
      expect(form.value.select).toEqual([])
      expect(form.value.checkbox).toEqual([])
    })

    it('should set multiple fields at once', () => {
      const [, form, { setFields }] = useForm([
        { label: '文本', key: 'text', as: 'input' },
        { label: '数字', key: 'number', as: 'input-number' },
        { label: '开关', key: 'switch', as: 'switch' },
        { label: '选择', key: 'select', as: 'select' },
      ])

      setFields({
        text: 'new text',
        number: 42,
        switch: true,
        select: 'option1',
      })

      expect(form.value.text).toBe('new text')
      expect(form.value.number).toBe(42)
      expect(form.value.switch).toBe(true)
      expect(form.value.select).toBe('option1')
    })
  })

  describe('component type aliases', () => {
    it('should handle date and date-picker aliases', () => {
      const [, form1] = useForm([{ label: '日期1', key: 'date1', as: 'date' }])
      const [, form2] = useForm([{ label: '日期2', key: 'date2', as: 'date-picker' }])

      expect(form1.value.date1).toBe(null)
      expect(form2.value.date2).toBe(null)
    })

    it('should handle time and time-picker aliases', () => {
      const [, form1] = useForm([{ label: '时间1', key: 'time1', as: 'time' }])
      const [, form2] = useForm([{ label: '时间2', key: 'time2', as: 'time-picker' }])

      expect(form1.value.time1).toBe(null)
      expect(form2.value.time2).toBe(null)
    })

    it('should handle checkbox and checkbox-group aliases', () => {
      const [, form1] = useForm([{ label: '复选框1', key: 'checkbox1', as: 'checkbox' }])
      const [, form2] = useForm([{ label: '复选框2', key: 'checkbox2', as: 'checkbox-group' }])

      expect(form1.value.checkbox1).toEqual([])
      expect(form2.value.checkbox2).toEqual([])
    })

    it('should handle radio and radio-group aliases', () => {
      const [, form1] = useForm([{ label: '单选1', key: 'radio1', as: 'radio' }])
      const [, form2] = useForm([{ label: '单选2', key: 'radio2', as: 'radio-group' }])

      expect(form1.value.radio1).toBe(null)
      expect(form2.value.radio2).toBe(null)
    })

    it('should handle radio-button and radio-button-group aliases', () => {
      const [, form1] = useForm([{ label: '单选按钮1', key: 'radioButton1', as: 'radio-button' }])
      const [, form2] = useForm([{ label: '单选按钮2', key: 'radioButton2', as: 'radio-button-group' }])

      expect(form1.value.radioButton1).toBe(null)
      expect(form2.value.radioButton2).toBe(null)
    })

    it('should handle checkbox-button and checkbox-button-group aliases', () => {
      const [, form1] = useForm([{ label: '复选按钮1', key: 'checkboxButton1', as: 'checkbox-button' }])
      const [, form2] = useForm([{ label: '复选按钮2', key: 'checkboxButton2', as: 'checkbox-button-group' }])

      expect(form1.value.checkboxButton1).toEqual([])
      expect(form2.value.checkboxButton2).toEqual([])
    })
  })

  describe('edge cases', () => {
    it('should handle fields without explicit as property (defaults to input)', () => {
      const [, { form }] = useForm([
        { label: '默认字段', key: 'default' },
      ])

      expect(form.value.default).toBe(null)
    })

    it('should handle multiple selection with multiple property', () => {
      const [, { form }] = useForm([
        { label: '单选', key: 'singleSelect', as: 'select' },
        { label: '多选', key: 'multiSelect', as: 'select', multiple: true },
        { label: '单选级联', key: 'singleCascader', as: 'cascader' },
        { label: '多选级联', key: 'multiCascader', as: 'cascader', multiple: true },
        { label: '单选树', key: 'singleTree', as: 'tree-select' },
        { label: '多选树', key: 'multiTree', as: 'tree-select', multiple: true },
      ])

      expect(form.value.singleSelect).toBe(null)
      expect(form.value.multiSelect).toEqual([])
      expect(form.value.singleCascader).toBe(null)
      expect(form.value.multiCascader).toEqual([])
      expect(form.value.singleTree).toBe(null)
      expect(form.value.multiTree).toEqual([])
    })
  })

  describe('form rules generation', () => {
    describe('input type rules', () => {
      it('should generate correct rules for input components', () => {
        const [, { rules }] = useForm([
          { label: '文本输入', key: 'input', as: 'input' },
          { label: '自动完成', key: 'autoComplete', as: 'auto-complete' },
          { label: '动态输入', key: 'dynamicInput', as: 'dynamic-input' },
        ], { autoRules: ['input', 'autoComplete', 'dynamicInput'] })

        const rulesValue = rules.value
        expect(rulesValue).toBeDefined()
        expect(rulesValue.input).toMatchObject({
          required: true,
          message: '请输入文本输入',
          trigger: ['blur', 'input'],
        })
        expect(rulesValue.autoComplete).toMatchObject({
          required: true,
          message: '请输入自动完成',
          trigger: ['blur', 'input'],
        })
        expect(rulesValue.dynamicInput).toMatchObject({
          required: true,
          message: '请输入动态输入',
          trigger: ['blur', 'input'],
        })
      })
    })

    describe('selection type rules', () => {
      it('should generate correct rules for select components', () => {
        const [, { rules }] = useForm([
          { label: '下拉选择', key: 'select', as: 'select' },
          { label: '树选择', key: 'treeSelect', as: 'tree-select' },
          { label: '级联选择', key: 'cascader', as: 'cascader' },
        ], { autoRules: ['select', 'treeSelect', 'cascader'] })

        const rulesValue = rules.value
        expect(rulesValue.select).toMatchObject({
          required: true,
          message: '请选择下拉选择',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.select.validator).toBeDefined()

        expect(rulesValue.treeSelect).toMatchObject({
          required: true,
          message: '请选择树选择',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.treeSelect.validator).toBeDefined()

        expect(rulesValue.cascader).toMatchObject({
          required: true,
          message: '请选择级联选择',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.cascader.validator).toBeDefined()
      })

      it('should generate correct rules for date/time components', () => {
        const [, { rules }] = useForm([
          { label: '日期', key: 'date', as: 'date' },
          { label: '日期选择', key: 'datePicker', as: 'date-picker' },
          { label: '时间', key: 'time', as: 'time' },
          { label: '时间选择', key: 'timePicker', as: 'time-picker' },
        ], { autoRules: ['date', 'datePicker', 'time', 'timePicker'] })

        const rulesValue = rules.value
        expect(rulesValue.date).toMatchObject({
          required: true,
          message: '请选择日期',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.datePicker).toMatchObject({
          required: true,
          message: '请选择日期选择',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.time).toMatchObject({
          required: true,
          message: '请选择时间',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.timePicker).toMatchObject({
          required: true,
          message: '请选择时间选择',
          trigger: ['blur', 'change'],
        })
      })

      it('should generate correct rules for radio components', () => {
        const [, { rules }] = useForm([
          { label: '单选', key: 'radio', as: 'radio' },
          { label: '单选组', key: 'radioGroup', as: 'radio-group' },
          { label: '单选按钮', key: 'radioButton', as: 'radio-button' },
          { label: '单选按钮组', key: 'radioButtonGroup', as: 'radio-button-group' },
        ], { autoRules: ['radio', 'radioGroup', 'radioButton', 'radioButtonGroup'] })

        const rulesValue = rules.value
        expect(rulesValue.radio).toMatchObject({
          required: true,
          message: '请选择单选',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.radioGroup).toMatchObject({
          required: true,
          message: '请选择单选组',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.radioButton).toMatchObject({
          required: true,
          message: '请选择单选按钮',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.radioButtonGroup).toMatchObject({
          required: true,
          message: '请选择单选按钮组',
          trigger: ['blur', 'change'],
        })
      })
    })

    describe('array type rules', () => {
      it('should generate correct rules for array components', () => {
        const [, { rules }] = useForm([
          { label: '复选框', key: 'checkbox', as: 'checkbox' },
          { label: '复选框组', key: 'checkboxGroup', as: 'checkbox-group' },
          { label: '复选框按钮', key: 'checkboxButton', as: 'checkbox-button' },
          { label: '复选框按钮组', key: 'checkboxButtonGroup', as: 'checkbox-button-group' },
          { label: '动态标签', key: 'dynamicTags', as: 'dynamic-tags' },
          { label: '传输', key: 'transfer', as: 'transfer' },
          { label: '上传', key: 'upload', as: 'upload' },
        ], {
          autoRules: ['checkbox', 'checkboxGroup', 'checkboxButton', 'checkboxButtonGroup', 'dynamicTags', 'transfer', 'upload'],
        })

        const rulesValue = rules.value
        expect(rulesValue.checkbox).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框',
          trigger: 'change',
        })
        expect(rulesValue.checkboxGroup).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框组',
          trigger: 'change',
        })
        expect(rulesValue.checkboxButton).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框按钮',
          trigger: 'change',
        })
        expect(rulesValue.checkboxButtonGroup).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框按钮组',
          trigger: 'change',
        })
        expect(rulesValue.dynamicTags).toMatchObject({
          type: 'array',
          required: true,
          message: '请输入动态标签',
          trigger: 'change',
        })
        expect(rulesValue.transfer).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择传输',
          trigger: 'change',
        })
        expect(rulesValue.upload).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择上传',
          trigger: 'change',
        })
      })
    })

    describe('number type rules', () => {
      it('should generate correct rules for number components', () => {
        const [, { rules }] = useForm([
          { label: '数字输入', key: 'inputNumber', as: 'input-number' },
          { label: '滑块', key: 'slider', as: 'slider' },
          { label: '评分', key: 'rate', as: 'rate' },
        ], { autoRules: ['inputNumber', 'slider', 'rate'] })

        const rulesValue = rules.value
        expect(rulesValue.inputNumber).toMatchObject({
          type: 'number',
          required: true,
          message: '请输入数字输入',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.slider).toMatchObject({
          type: 'number',
          required: true,
          message: '请选择滑块',
          trigger: ['blur', 'change'],
        })
        expect(rulesValue.rate).toMatchObject({
          type: 'number',
          required: true,
          message: '请选择评分',
          trigger: ['blur', 'change'],
        })
      })
    })

    describe('boolean type rules', () => {
      it('should generate correct rules for switch component', () => {
        const [, { rules }] = useForm([
          { label: '开关', key: 'switch', as: 'switch' },
        ], { autoRules: ['switch'] })

        const rulesValue = rules.value
        expect(rulesValue.switch).toMatchObject({
          type: 'boolean',
          required: true,
          message: '请选择开关',
          trigger: 'change',
        })
      })
    })

    describe('other type rules', () => {
      it('should generate correct rules for color-picker component', () => {
        const [, { rules }] = useForm([
          { label: '颜色选择', key: 'colorPicker', as: 'color-picker' },
        ], { autoRules: ['colorPicker'] })

        const rulesValue = rules.value
        expect(rulesValue.colorPicker).toMatchObject({
          required: true,
          message: '请选择颜色选择',
          trigger: 'change',
        })
      })

      it('should generate default rules for unknown component types', () => {
        const [, { rules }] = useForm([
          { label: '未知类型', key: 'unknown', as: 'unknown-type' as any },
        ], { autoRules: ['unknown'] })

        const rulesValue = rules.value
        expect(rulesValue.unknown).toMatchObject({
          required: true,
          message: '请输入未知类型',
          trigger: ['blur', 'input'],
        })
      })
    })

    describe('auto rules configuration', () => {
      it('should only generate rules for fields specified in autoRules', () => {
        const [, { rules }] = useForm([
          { label: '文本1', key: 'text1', as: 'input' },
          { label: '文本2', key: 'text2', as: 'input' },
          { label: '数字', key: 'number', as: 'input-number' },
        ], { autoRules: ['text1', 'number'] })

        const rulesValue = rules.value
        expect(rulesValue.text1).toBeDefined()
        expect(rulesValue.text2).toBeUndefined()
        expect(rulesValue.number).toBeDefined()
      })

      it('should not generate rules when autoRules is not provided', () => {
        const [, { rules }] = useForm([
          { label: '文本', key: 'text', as: 'input' },
          { label: '数字', key: 'number', as: 'input-number' },
        ])

        const rulesValue = rules.value
        expect(Object.keys(rulesValue)).toHaveLength(0)
      })

      it('should not generate rules when autoRules is empty', () => {
        const [, { rules }] = useForm([
          { label: '文本', key: 'text', as: 'input' },
          { label: '数字', key: 'number', as: 'input-number' },
        ], { autoRules: [] })

        const rulesValue = rules.value
        expect(Object.keys(rulesValue)).toHaveLength(0)
      })
    })

    describe('custom rules priority', () => {
      it('should prioritize manually defined rules over auto-generated rules', () => {
        const customRule = {
          required: false,
          message: '自定义规则',
          trigger: 'input',
        }

        const [, { rules }] = useForm([
          { label: '文本', key: 'text', as: 'input', rules: customRule },
        ], { autoRules: ['text'] })

        const rulesValue = rules.value
        expect(rulesValue.text).toEqual(customRule)
        expect(rulesValue.text.required).toBe(false)
        expect(rulesValue.text.message).toBe('自定义规则')
      })
    })

    describe('validator functionality', () => {
      it('should validate null, undefined and empty string values correctly for select types', () => {
        const [, { rules }] = useForm([
          { label: '选择', key: 'select', as: 'select' },
        ], { autoRules: ['select'] })

        const rulesValue = rules.value
        const validator = (rulesValue.select as FormItemRule).validator!

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
        const [, { rules }] = useForm([
          { label: '嵌套字段', key: 'user.name', as: 'input' },
          { label: '深层嵌套', key: 'user.profile.email', as: 'input' },
        ], { autoRules: ['user.name', 'user.profile.email'] })

        const rulesValue = rules.value
        expect(rulesValue.user?.name).toBeDefined()
        expect(rulesValue.user?.profile?.email).toBeDefined()
        expect(rulesValue.user.name).toMatchObject({
          required: true,
          message: '请输入嵌套字段',
          trigger: ['blur', 'input'],
        })
        expect(rulesValue.user.profile.email).toMatchObject({
          required: true,
          message: '请输入深层嵌套',
          trigger: ['blur', 'input'],
        })
      })
    })
  })
})
