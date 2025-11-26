import { NAvatar } from 'naive-ui'
import { defineComponent } from 'vue'

interface UserAvatarProps {
  username?: string
  avatar?: string
  size?: 'small' | 'medium' | 'large' | number
  round?: boolean
}

export const UserAvatar = defineComponent<UserAvatarProps>({
  name: 'UserAvatar',
  props: {
    username: String,
    avatar: String,
    size: {
      type: [String, Number] as any,
      default: 'medium',
    },
    round: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return () => {
      const displayName = props.username?.charAt(0).toUpperCase() || 'U'

      return (
        <NAvatar
          src={props.avatar}
          size={props.size}
          round={props.round}
          fallback-src=""
        >
          {displayName}
        </NAvatar>
      )
    }
  },
})