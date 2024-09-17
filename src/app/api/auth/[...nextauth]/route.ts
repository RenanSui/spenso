import { authOptions } from '@/lib/auth'
import NextAuth from 'next-auth/next'

const handler = NextAuth(authOptions) as unknown as (req: unknown, res: unknown) => void

export { handler as GET, handler as POST }
