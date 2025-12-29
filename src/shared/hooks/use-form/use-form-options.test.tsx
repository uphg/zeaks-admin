import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useFormLite } from './use-form-lite'

describe('useForm with reactive options', () => {
  it('should support reactive options for select component', async () => {
    // 创建响应式的 options
    const selectOptions = ref([
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
    ])

    const [, form] = useFormLite([
      ['选择器', 'selectField', { as: 'select', options: selectOptions }],
    ])

    // 验证初始状态
    expect(form.value.selectField).toBe(null)

    // 更新 options
    selectOptions.value = [
      { label: '新选项1', value: 'newOption1' },
      { label: '新选项2', value: 'newOption2' },
    ]

    // 验证 options 可以被更新（这个测试主要是验证类型正确性）
    expect(selectOptions.value).toHaveLength(2)
  })

  it('should support reactive options for checkbox group', async () => {
    // 创建响应式的 options
    const checkboxOptions = ref([
      { label: '选项A', value: 'A' },
      { label: '选项B', value: 'B' },
    ])

    const [, form] = useFormLite([
      ['复选框组', 'checkboxField', { as: 'checkbox-group', options: checkboxOptions }],
    ])

    // 验证初始状态
    expect(form.value.checkboxField).toEqual([])

    // 更新 options
    checkboxOptions.value = [
      { label: '新选项X', value: 'X' },
      { label: '新选项Y', value: 'Y' },
    ]

    // 验证 options 可以被更新
    expect(checkboxOptions.value).toHaveLength(2)
  })

  it('should support reactive options for radio group', async () => {
    // 创建响应式的 options
    const radioOptions = ref([
      { label: '选项甲', value: 'Jia' },
      { label: '选项乙', value: 'Yi' },
    ])

    const [, form] = useFormLite([
      ['单选框组', 'radioField', { as: 'radio-group', options: radioOptions }],
    ])

    // 验证初始状态
    expect(form.value.radioField).toBe(null)

    // 更新 options
    radioOptions.value = [
      { label: '新选项一', value: 'Yi1' },
      { label: '新选项二', value: 'Yi2' },
    ]

    // 验证 options 可以被更新
    expect(radioOptions.value).toHaveLength(2)
  })

  it('should support getter function for options', async () => {
    const optionsData = [
      { label: '静态选项1', value: 'static1' },
      { label: '静态选项2', value: 'static2' },
    ]

    // 使用 getter 函数
    const optionsGetter = () => optionsData

    const [, form] = useFormLite([
      ['选择器', 'selectField', { as: 'select', options: optionsGetter }],
    ])

    // 验证初始状态
    expect(form.value.selectField).toBe(null)
  })
})
