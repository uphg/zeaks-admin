import type { User } from "@/shared/lib/utility-types";
import { createStore } from "@/shared/lib/create-store";
import { ref } from "vue";

export type UserStore = ReturnType<typeof useUserStore>

export const useUserStore = createStore(() => {
  const user = ref<User | null>(null);
  const permissions = ref<string[]>([]);
  
  function setUser(value: User | Partial<User> | null) {
    if (value === null) {
      user.value = null;
    } else if (user.value === null) {
      user.value = value as User;
    } else {
      Object.assign(user.value, value);
    }
  }
  
  function setPermissions(value: string[]) {
    permissions.value = value;
  }
  
  function clear() {
    user.value = null;
    permissions.value = [];
  }
  return { user, setUser, permissions, setPermissions, clear };
})

