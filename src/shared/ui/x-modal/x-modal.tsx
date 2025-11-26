import { defineComponent, ref, computed, type PropType } from '@/shared/ui/vue-imports'
import type { ClassNameValue, RenderFunction } from '@/shared/ui/vue-imports'
import { pick } from 'lodash-es'
import { NButton, NModal, NScrollbar } from 'naive-ui'
import { X } from 'lucide-vue-next'
import { mergeClass } from '@/shared/lib'
import { PureButton } from '../pure-button'

const defaultClass = {
  wrap: 'bg-white rounded-lg min-w-sm max-w-2xl',
  header: 'flex items-center justify-between p-4',
  title: 'text-lg',
  content: 'p-4',
  footer: 'flex items-center justify-end gap-3 p-4',
}

const modalProps = {
  visible: Boolean as PropType<boolean>,
  title: String,
  showClose: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  confirmLoading: Boolean,
  confirmText: { type: String, default: '确认' },
  cancelText: { type: String, default: '取消' },
  onConfirm: Function,
  onCancel: Function,
  onClose: Function,
  onAfterEnter: Function,
  onAfterLeave: Function,
  onEsc: Function,
  onMaskClick: Function,
  maskClosable: { type: Boolean, default: true },
  headerClass: [String],
  contentClass: [String],
  footerClass: [String],
  size: { type: String as PropType<'small' | 'medium' | 'large' | 'huge'>, default: 'medium' },
  header: Function as PropType<RenderFunction>,
  footer: Function as PropType<RenderFunction>,
}

const NModalPropNames = ['onAfterEnter', 'onAfterLeave', 'onEsc', 'onMaskClick', 'maskClosable']
const sizeMap = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
  huge: 'max-w-2xl',
}

const Modal = defineComponent({
  props: modalProps,
  emits: ['update:visible'],
  inheritAttrs: false,
  setup(props, { emit, slots, attrs }) {
    const classNames = computed(() => mergeClass(defaultClass.wrap, sizeMap[props.size || 'medium'], attrs.class as ClassNameValue))
    function onUpdateVisible(value: boolean) {
      emit('update:visible', value)
    }

    async function handleConfirm(e: MouseEvent) {
      props.onConfirm?.(e)
    }

    async function handleCancel(e: MouseEvent) {
      props.onCancel?.(e)
    }

    async function handleClose(e: MouseEvent) {
      props.onClose?.(e)
      onUpdateVisible(false)
    }

    return () => (
      <NModal
        {...attrs}
        class={classNames.value}
        show={props.visible}
        onUpdate:show={onUpdateVisible}
        {...pick(props, NModalPropNames) as any}
      >
        <div>
          {(props.header || props.title || props.showClose) && (
            <div class={mergeClass(defaultClass.header, props.headerClass)}>
              {props.header
                ? props.header()
                : (
                    <h3 class={defaultClass.title}>{props.title}</h3>
                  )}
              {props.showClose && (
                <PureButton
                  onClick={handleClose}
                  class="ml-2"
                >
                  <X class="h-4.5 w-4.5" />
                </PureButton>
              )}
            </div>
          )}
          <div>
            {/* height: 100vh - header - footer - [top/bottom]gap*2 */}
            <NScrollbar class="max-h-[calc(100vh-60px-66px-(20px*2))]">
              <div class={mergeClass(defaultClass.content, props.contentClass)}>
                {slots.default?.()}
              </div>
            </NScrollbar>
          </div>
          {props.showFooter && (props.footer || props.showFooter) && (
            <div class={mergeClass(defaultClass.footer, props.footerClass)}>
              {props.footer
                ? props.footer()
                : (
                    <>
                      <NButton onClick={handleCancel}>{props.cancelText}</NButton>
                      <NButton
                        type="primary"
                        loading={props.confirmLoading}
                        onClick={handleConfirm}
                      >
                        {props.confirmText}
                      </NButton>
                    </>
                  )}
            </div>
          )}
        </div>
      </NModal>
    )
  },
})

export default Modal