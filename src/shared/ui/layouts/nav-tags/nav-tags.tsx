import type { NavTagItem } from './use-nav-tags-store'
import { defineComponent, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTagsStore } from './use-nav-tags-store'
import NavTag from './nav-tag'

const LayoutNavTags = defineComponent(() => {
  const tagsWrapRef = shallowRef<HTMLDivElement | null>(null)
  const { tags, active, append, remove, setActive } = useNavTagsStore()
  const route = useRoute()
  const router = useRouter()
  console.log('tags.value')
  console.log(tags.value)

  watch(
    () => route.name,
    () => {
      const tag = {
        name: route.name as string,
        title: route.meta?.title as string,
        path: route.path,
      }
      append(tag)
      setActive(route.name as string)
    },
    { immediate: true },
  )

  function onItemClick(item: NavTagItem, _index: number) {
    setActive(item.name)
    router.push(item.path)
  }

  function onItemClose(item: NavTagItem, index: number) {
    if (tags.value.length === 1) return
    if (item.name === route.name) {
      if (index === tags.value.length - 1) {
        router.push(tags.value[index - 1]!.path)
      } else {
        router.push(tags.value[index + 1]!.path)
      }
    }
    remove(item.name)
  }

  function onTagsWheel(e: WheelEvent) {
    e.preventDefault()
    const deltaY = e.deltaY
    tagsWrapRef.value!.scrollTo({
      left: tagsWrapRef.value!.scrollLeft + deltaY * 1.5,
      behavior: 'smooth',
    })
  }

  return () => (
    <div class="tags border-b-1 border-b-gray-200 w-full">
      <div
        ref={tagsWrapRef}
        class="tags-wrapper flex w-full items-center overflow-auto"
        onWheel={onTagsWheel}
      >
        <div class="px-4 py-3 flex gap-2">
          {tags.value.map((item, index) => (
            <NavTag
              key={item.name}
              active={active.value === item.name}
              closable={tags.value?.length > 1}
              onClick={() => onItemClick(item, index)}
              onClose={() => onItemClose(item, index)}
            >
              {item.title}
            </NavTag>
          ))}
        </div>
      </div>
    </div>
  )
})

export default LayoutNavTags
