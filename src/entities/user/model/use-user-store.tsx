import type { User } from "@/shared/lib/utility-types";
import { createStore } from "@/shared/alias/vue-use";
import { ref } from "vue";

export type UserStore = ReturnType<typeof useUserStore>

export const useUserStore = createStore(() => {
  const user = ref<User | null>({});
  const permsissions = ref<string[]>([]);
  function setUser(value: User | null) {
    console.log('userStore - value')
    console.log(value)
    user.value && Object.assign(user.value, value);
  }
  function clear() {}
  return { user, setUser, permsissions, clear };
})

