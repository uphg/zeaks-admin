import { NAvatar, NDropdown } from 'naive-ui'
import IconFileText from '~icons/lucide/file-text'
import IconGithub from '~icons/lucide/github'
import IconLogOut from '~icons/lucide/log-out'
import IconUser from '~icons/lucide/user'
import { useLogout } from '@/entities/user/model/use-logout'
import { useUserStore } from '@/entities/user/model/use-user-store'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const UserDropdown = defineComponent({
  setup() {
    const { user } = useUserStore()
    const { logout } = useLogout()
    const router = useRouter()

    const options = [
      {
        label: '个人资料',
        key: 'profile',
        icon: () => <IconUser class="h-4 w-4" />,
      },
      {
        label: '文档',
        key: 'docs',
        icon: () => <IconFileText class="h-4 w-4" />,
      },
      {
        label: 'GitHub',
        key: 'github',
        icon: () => <IconGithub class="h-4 w-4" />,
      },
      {
        type: 'divider',
        key: 'divider',
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: () => <IconLogOut class="h-4 w-4" />,
      },
    ]

    const handleSelect = async (key: string) => {
      switch (key) {
        case 'profile':
          await router.push('/user/profile')
          break
        case 'docs':
          window.open('https://vue-best-admin.github.io/', '_blank')
          break
        case 'github':
          window.open('https://github.com/vue-best-admin/vue-best-admin', '_blank')
          break
        case 'logout':
          try {
            await logout()
          } catch (error) {
            // 用户取消退出或退出失败，这里可以添加错误处理
            console.log('退出登录被取消或失败:', error)
          }
          break
      }
    }

    const avatarSrc = computed(() => {
      return user.value?.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    })

    const userName = computed(() => {
      return user.value?.name || '用户'
    })

    return () => (
      <NDropdown
        options={options}
        onSelect={handleSelect}
        trigger="hover"
        placement="bottom-end"
      >
        <div class="px-2 py-1 rounded-md flex cursor-pointer transition-colors items-center hover:bg-gray-100 dark:hover:bg-gray-800">
          <NAvatar
            round
            size="medium"
            src={avatarSrc.value}
            class="mr-2"
          />
          <span class="text-sm text-gray-700 font-medium dark:text-gray-300">
            {userName.value}
          </span>
        </div>
      </NDropdown>
    )
  },
})

export default UserDropdown
