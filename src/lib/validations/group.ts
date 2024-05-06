import { z } from 'zod'

export const createGroupSchema = z.object({
  title: z.string().min(3).max(50),
})

export type CreateGroupSchema = z.infer<typeof createGroupSchema>
