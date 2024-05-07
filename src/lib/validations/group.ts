import { z } from 'zod'
import * as zfd from 'zod-form-data'

export const createGroupSchema = z.object({
  title: z.string().min(3).max(50),
})
export type CreateGroupSchema = z.infer<typeof createGroupSchema>

export const updateGroupSchema = zfd.formData({
  title: zfd.text(z.string().min(3).max(50)),
})
