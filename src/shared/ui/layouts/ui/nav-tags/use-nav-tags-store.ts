import { createStore } from "@/shared/alias/vue-use";
import { ref } from "vue";

export interface NavTagItem {
  title: string
  name: string
  path: string
  icon?: string
}

export const useNavTagsStore = createStore(() => {
  const tags = ref<NavTagItem[]>([])
  const active = ref<string>('')

  function append(option: NavTagItem) {
    const existingtag = tags.value.find(tag => tag.name === option.name)
    if (!existingtag) {
      tags.value.push(option)
    }
  }

  function remove(name: string) {
    const index = tags.value.findIndex(tag => tag.name === name)
    if (index > -1) {
      tags.value.splice(index, 1)
      // 如果删除的是当前激活的标签页，需要切换到其他标签页
      if (active.value === name && tags.value.length > 0) {
        const newActiveIndex = Math.min(index, tags.value.length - 1)
        active.value = tags.value[newActiveIndex]!.name
      } else if (tags.value.length === 0) {
        active.value = ''
      }
    }
  }

  function setActive(name: string) {
    const tag = tags.value.find(tag => tag.name === name)
    if (!tag) return
    active.value = name
  }


  return { tags, active, append, remove, setActive }
})