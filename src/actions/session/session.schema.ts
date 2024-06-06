import { z } from 'zod'
import { AlpSessionSchema } from '@/schemas'

export const errorSession = AlpSessionSchema.pick({
  resultMessage: true,
  bannerId: true,
}).merge(
  z.object({
    total: z.number().int(),
    bannerName: z.string(),
    priority: z.number(),
  })
)
export type ErrorSession = z.infer<typeof errorSession>
export const listErrorSessionsResponse = z.array(errorSession)
export type ListErrorSessionsResponse = z.infer<
  typeof listErrorSessionsResponse
>
