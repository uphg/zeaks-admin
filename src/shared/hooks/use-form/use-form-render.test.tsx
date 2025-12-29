import { render, screen } from '@testing-library/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { useFormLite } from './use-form-lite'

// Mock NaiveUI components inline
vi.mock('naive-ui', () => ({
  NAutoComplete: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-auto-complete', ...props }, slots?.default?.())),
  NCascader: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-cascader', ...props }, slots?.default?.())),
  NCheckbox: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-checkbox', ...props }, slots?.default?.())),
  NCheckboxGroup: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-checkbox-group', ...props }, slots?.default?.())),
  NColorPicker: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-color-picker', ...props }, slots?.default?.())),
  NDatePicker: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-date-picker', ...props }, slots?.default?.())),
  NDynamicInput: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-dynamic-input', ...props }, slots?.default?.())),
  NDynamicTags: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-dynamic-tags', ...props }, slots?.default?.())),
  NForm: vi.fn((props, { slots }) => h('form', { 'data-testid': 'n-form', ...props }, slots?.default?.())),
  NFormItem: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-form-item', ...props }, slots?.default?.())),
  NFormItemGi: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-form-item-gi', ...props }, slots?.default?.())),
  NGrid: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-grid', ...props }, slots?.default?.())),
  NInput: vi.fn((props, { slots }) => h('input', { 'data-testid': 'n-input', ...props }, slots?.default?.())),
  NInputNumber: vi.fn((props, { slots }) => h('input', { 'data-testid': 'n-input-number', 'type': 'number', ...props }, slots?.default?.())),
  NRadio: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-radio', ...props }, slots?.default?.())),
  NRadioButton: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-radio-button', ...props }, slots?.default?.())),
  NRadioGroup: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-radio-group', ...props }, slots?.default?.())),
  NRate: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-rate', ...props }, slots?.default?.())),
  NSelect: vi.fn((props, { slots }) => h('select', { 'data-testid': 'n-select', ...props }, slots?.default?.())),
  NSlider: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-slider', ...props }, slots?.default?.())),
  NSwitch: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-switch', ...props }, slots?.default?.())),
  NTimePicker: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-time-picker', ...props }, slots?.default?.())),
  NTransfer: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-transfer', ...props }, slots?.default?.())),
  NTreeSelect: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-tree-select', ...props }, slots?.default?.())),
  NUpload: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-upload', ...props }, slots?.default?.())),
}))

vi.mock('naive-ui/es/_utils', () => ({
  omit: (obj: any, keys: string[]) => {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  },
}))

describe('useForm component rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('input components', () => {
    it('should render NInput for input type', async () => {
      const [Form] = useFormLite([
        ['用户名', 'username', { as: 'input' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NInput).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()

      // 额外的验证
      const input = screen.getByTestId('n-input')
      expect(input).toBeDefined()
      expect(input.tagName).toBe('INPUT')
    })

    it('should render NAutoComplete for auto-complete type', async () => {
      const [Form] = useFormLite([
        ['搜索', 'search', { as: 'auto-complete' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NAutoComplete).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NInputNumber for input-number type', async () => {
      const [Form] = useFormLite([
        ['年龄', 'age', { as: 'input-number' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NInputNumber).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('selection components', () => {
    it('should render NSelect for select type', async () => {
      const [Form] = useFormLite([
        ['城市', 'city', { as: 'select', options: [{ label: '北京', value: 'beijing' }] }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NSelect).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NCascader for cascader type', async () => {
      const [Form] = useFormLite([
        ['地区', 'region', { as: 'cascader' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NCascader).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NTreeSelect for tree-select type', async () => {
      const [Form] = useFormLite([
        ['部门', 'department', { as: 'tree-select' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NTreeSelect).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('date/time components', () => {
    it('should render NDatePicker for date-picker type', async () => {
      const [Form] = useFormLite([
        ['生日', 'birthday', { as: 'date-picker' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NDatePicker).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NTimePicker for time-picker type', async () => {
      const [Form] = useFormLite([
        ['时间', 'time', { as: 'time-picker' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NTimePicker).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('boolean components', () => {
    it('should render NSwitch for switch type', async () => {
      const [Form] = useFormLite([
        ['启用', 'enabled', { as: 'switch' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NSwitch).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('range components', () => {
    it('should render NSlider for slider type', async () => {
      const [Form] = useFormLite([
        ['音量', 'volume', { as: 'slider' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NSlider).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NRate for rate type', async () => {
      const [Form] = useFormLite([
        ['评分', 'rating', { as: 'rate' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NRate).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('multiple selection components', () => {
    it('should render NCheckboxGroup and NCheckbox for checkbox-group type', async () => {
      const [Form] = useFormLite([
        ['爱好', 'hobbies', {
          as: 'checkbox-group',
          options: [
            { label: '读书', value: 'reading' },
            { label: '运动', value: 'sports' },
          ],
        }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NCheckboxGroup).toHaveBeenCalled()
      expect(naiveUI.NCheckbox).toHaveBeenCalledTimes(2) // Two options
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NRadioGroup and NRadio for radio-group type', async () => {
      const [Form] = useFormLite([
        ['性别', 'gender', {
          as: 'radio-group',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NRadioGroup).toHaveBeenCalled()
      expect(naiveUI.NRadio).toHaveBeenCalledTimes(2)
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NRadioGroup and NRadioButton for radio-button-group type', async () => {
      const [Form] = useFormLite([
        ['类型', 'type', {
          as: 'radio-button-group',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ],
        }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NRadioGroup).toHaveBeenCalled()
      expect(naiveUI.NRadioButton).toHaveBeenCalledTimes(2)
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('special components', () => {
    it('should render NColorPicker for color-picker type', async () => {
      const [Form] = useFormLite([
        ['颜色', 'color', { as: 'color-picker' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NColorPicker).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NTransfer for transfer type', async () => {
      const [Form] = useFormLite([
        ['权限', 'permissions', { as: 'transfer' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NTransfer).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NUpload for upload type', async () => {
      const [Form] = useFormLite([
        ['文件', 'file', { as: 'upload' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NUpload).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NDynamicInput for dynamic-input type', async () => {
      const [Form] = useFormLite([
        ['标签', 'tags', { as: 'dynamic-input' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NDynamicInput).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NDynamicTags for dynamic-tags type', async () => {
      const [Form] = useFormLite([
        ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NDynamicTags).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('default behavior', () => {
    it('should render NInput for unknown component type (fallback)', async () => {
      const [Form] = useFormLite([
        ['未知', 'unknown', { as: 'unknown-type' as any }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NInput).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })

    it('should render NInput when no as property is provided', async () => {
      const [Form] = useFormLite([
        ['默认', 'default', {}],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      expect(naiveUI.NInput).toHaveBeenCalled()
      expect(naiveUI.NForm).toHaveBeenCalled()
      expect(naiveUI.NFormItem).toHaveBeenCalled()
    })
  })

  describe('comprehensive component coverage', () => {
    it('should render all supported component types', async () => {
      const [Form] = useFormLite([
        // Input types
        ['输入框', 'input', { as: 'input' }],
        ['自动完成', 'autoComplete', { as: 'auto-complete' }],
        ['数字输入', 'inputNumber', { as: 'input-number' }],

        // Selection types
        ['下拉选择', 'select', { as: 'select' }],
        ['级联选择', 'cascader', { as: 'cascader' }],
        ['树选择', 'treeSelect', { as: 'tree-select' }],

        // Date/Time types
        ['日期选择', 'datePicker', { as: 'date-picker' }],
        ['时间选择', 'timePicker', { as: 'time-picker' }],

        // Boolean types
        ['开关', 'switch', { as: 'switch' }],

        // Range types
        ['滑块', 'slider', { as: 'slider' }],
        ['评分', 'rate', { as: 'rate' }],

        // Multiple selection types
        ['复选框组', 'checkboxGroup', { as: 'checkbox-group', options: [{ label: '选项1', value: '1' }] }],
        ['单选框组', 'radioGroup', { as: 'radio-group', options: [{ label: '选项1', value: '1' }] }],

        // Special types
        ['颜色选择', 'colorPicker', { as: 'color-picker' }],
        ['传输框', 'transfer', { as: 'transfer' }],
        ['上传', 'upload', { as: 'upload' }],
        ['动态输入', 'dynamicInput', { as: 'dynamic-input' }],
        ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')

      // Verify all components are called
      expect(naiveUI.NInput).toHaveBeenCalled()
      expect(naiveUI.NAutoComplete).toHaveBeenCalled()
      expect(naiveUI.NInputNumber).toHaveBeenCalled()
      expect(naiveUI.NSelect).toHaveBeenCalled()
      expect(naiveUI.NCascader).toHaveBeenCalled()
      expect(naiveUI.NTreeSelect).toHaveBeenCalled()
      expect(naiveUI.NDatePicker).toHaveBeenCalled()
      expect(naiveUI.NTimePicker).toHaveBeenCalled()
      expect(naiveUI.NSwitch).toHaveBeenCalled()
      expect(naiveUI.NSlider).toHaveBeenCalled()
      expect(naiveUI.NRate).toHaveBeenCalled()
      expect(naiveUI.NCheckboxGroup).toHaveBeenCalled()
      expect(naiveUI.NCheckbox).toHaveBeenCalled()
      expect(naiveUI.NRadioGroup).toHaveBeenCalled()
      expect(naiveUI.NRadio).toHaveBeenCalled()
      expect(naiveUI.NColorPicker).toHaveBeenCalled()
      expect(naiveUI.NTransfer).toHaveBeenCalled()
      expect(naiveUI.NUpload).toHaveBeenCalled()
      expect(naiveUI.NDynamicInput).toHaveBeenCalled()
      expect(naiveUI.NDynamicTags).toHaveBeenCalled()

      // Verify structure components
      expect(naiveUI.NForm).toHaveBeenCalledTimes(1)
      expect(naiveUI.NFormItem).toHaveBeenCalledTimes(18) // 18 form fields
    })
  })

  describe('nested fields', () => {
    it('should render nested fields with NGrid layout', async () => {
      const [Form] = useFormLite([
        ['活动名称', null, {
          grid: { cols: 2, xGap: 24 },
          children: [
            [null, 'name1', {}],
            [null, 'name2', {}],
          ],
        }],
        ['活动区域', 'region', {
          as: 'select',
          options: [
            { label: '区域一', value: 0 },
            { label: '区域二', value: 1 },
            { label: '区域三', value: 2 },
          ],
        }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      // 应该渲染 NGrid 组件用于嵌套字段
      expect(naiveUI.NGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          cols: 2,
          xGap: 24,
        }),
        expect.any(Object),
      )

      // 应该渲染两个输入框（嵌套字段）
      expect(naiveUI.NInput).toHaveBeenCalledTimes(2)

      // 应该渲染一个选择框
      expect(naiveUI.NSelect).toHaveBeenCalledTimes(1)

      // 应该有 NFormItemGi 用于嵌套字段
      expect(naiveUI.NFormItemGi).toHaveBeenCalledTimes(2)

      // 总共应该有 2 个 FormItem：嵌套容器 1 个 + 普通字段 1 个 = 2 个
      expect(naiveUI.NFormItem).toHaveBeenCalledTimes(2)

      // Form 应该只渲染一次
      expect(naiveUI.NForm).toHaveBeenCalledTimes(1)
    })

    it('should properly flatten nested fields for form data', async () => {
      const [_, { form }] = useFormLite([
        ['联系方式', null, {
          grid: { cols: 2 },
          children: [
            [null, 'phone', {}],
            [null, 'email', { as: 'input' }],
          ],
        }],
        ['备注', 'note', {}],
      ])

      // 检查表单数据是否正确初始化
      expect(form.value).toHaveProperty('phone')
      expect(form.value).toHaveProperty('email')
      expect(form.value).toHaveProperty('note')

      // 初始值应该都是 null
      expect(form.value.phone).toBe(null)
      expect(form.value.email).toBe(null)
      expect(form.value.note).toBe(null)
    })
  })

  describe('grid layout', () => {
    it('should render with NGrid when grid option is enabled', async () => {
      const [Form] = useFormLite([
        ['用户名', 'username', { as: 'input', span: 12 }],
        ['邮箱', 'email', { as: 'input', span: 12 }],
        ['备注', 'note', { as: 'input', span: 24 }],
      ], { grid: true })

      render(h(Form))

      const naiveUI = await import('naive-ui')
      // 应该渲染 NGrid 包装器
      expect(naiveUI.NGrid).toHaveBeenCalled()

      // 应该使用 NFormItemGi 而不是 NFormItem
      expect(naiveUI.NFormItemGi).toHaveBeenCalledTimes(3)
      expect(naiveUI.NFormItem).not.toHaveBeenCalled()

      // 应该传递 span 属性
      expect(naiveUI.NFormItemGi).toHaveBeenCalledWith(
        expect.objectContaining({ span: 12 }),
        expect.any(Object),
      )
      expect(naiveUI.NFormItemGi).toHaveBeenCalledWith(
        expect.objectContaining({ span: 24 }),
        expect.any(Object),
      )
    })

    it('should render without NGrid when grid option is disabled', async () => {
      const [Form] = useFormLite([
        ['用户名', 'username', { as: 'input', span: 12 }],
        ['邮箱', 'email', { as: 'input', span: 12 }],
      ])

      render(h(Form))

      const naiveUI = await import('naive-ui')
      // 不应该渲染 NGrid
      expect(naiveUI.NGrid).not.toHaveBeenCalled()

      // 应该使用 NFormItem 而不是 NFormItemGi
      expect(naiveUI.NFormItem).toHaveBeenCalledTimes(2)
      expect(naiveUI.NFormItemGi).not.toHaveBeenCalled()
    })

    it('should handle nested fields with grid layout', async () => {
      const [Form] = useFormLite([
        ['个人信息', null, {
          grid: { cols: 24, xGap: 16, yGap: 8 },
          children: [
            ['姓名', 'name', { as: 'input', span: 12 }],
            ['年龄', 'age', { as: 'input-number', span: 12 }],
          ],
        }],
      ], { grid: true })

      render(h(Form))

      const naiveUI = await import('naive-ui')
      // 外层 Grid
      expect(naiveUI.NGrid).toHaveBeenCalledWith(
        expect.objectContaining({}),
        expect.any(Object),
      )

      // 嵌套字段的 Grid
      expect(naiveUI.NGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          cols: 24,
          xGap: 16,
          yGap: 8,
        }),
        expect.any(Object),
      )
    })
  })
})
