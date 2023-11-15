import { SessionUser } from '@/actions/server/user'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

interface UserAvatarProps {
  user: SessionUser
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage className="h-8 w-8 rounded-full" src={user.image ?? ''} />
      <AvatarFallback>
        <div className="h-8 w-8 rounded-full bg-neutral-300 dark:bg-neutral-800" />
      </AvatarFallback>
    </Avatar>
  )
}
