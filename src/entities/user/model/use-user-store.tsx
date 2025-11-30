import { createStore } from "@/shared/lib/create-store";
import { ref } from "vue";

interface User { id: '', name: '', rules: [], email: '', token: '', avatar: '', rawRoutes: [], }

interface Perm {
  resource: string
  actions: string[]
}

export const useUserStore = createStore(() => {
  const user = ref<User | null>(null);
  const permsissions = ref<string[]>([]);
  return { user, permsissions };
})
