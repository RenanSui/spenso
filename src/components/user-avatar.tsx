'use client'

import { SessionUser } from '@/actions/server/user'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

interface UserAvatarProps {
  user: SessionUser
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage
        className="rounded-full"
        width={32}
        height={32}
        src={user.image ?? ''}
      />
      <AvatarFallback>{user.name ?? ''}</AvatarFallback>
    </Avatar>
  )
}
