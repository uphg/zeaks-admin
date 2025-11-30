import { createStore } from "@/shared/alias/vue-use";
import { ref } from "vue";
import type { User } from "@/shared/lib/utility-types";

export const useUserStore = createStore(() => {
  const user = ref<User | null>(null);
  const permsissions = ref<string[]>([]);
  return { user, permsissions };
})
