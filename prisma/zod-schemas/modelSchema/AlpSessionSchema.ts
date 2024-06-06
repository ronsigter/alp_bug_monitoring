import { z } from 'zod';

/////////////////////////////////////////
// ALP SESSION SCHEMA
/////////////////////////////////////////

export const AlpSessionSchema = z.object({
  id: z.bigint(),
  sessionId: z.string(),
  bannerId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  resultSuccess: z.boolean(),
  resultCode: z.number().int().nullable(),
  resultMessage: z.string().nullable(),
  alpVersion: z.string(),
  alpAction: z.string(),
  otaVersion: z.string(),
  platform: z.string(),
})

export type AlpSession = z.infer<typeof AlpSessionSchema>

export default AlpSessionSchema;
