import { z } from "zod";
import { AlpSessionSchema } from "@/schemas";

export const listErrorSessionsRequest = z.void();
export type ListErrorSessionsRequest = z.infer<typeof listErrorSessionsRequest>;
export const errorSession = AlpSessionSchema.pick({
  resultMessage: true,
  bannerId: true,
  alpVersion: true,
}).merge(
  z.object({
    total: z.number().int(),
    bannerName: z.string(),
    priority: z.number(),
  })
);
export type ErrorSession = z.infer<typeof errorSession>;
export const listErrorSessionsResponse = z.array(errorSession);
export type ListErrorSessionsResponse = z.infer<
  typeof listErrorSessionsResponse
>;

export const filterOptions = z.object({
  alpVersion: AlpSessionSchema.shape.alpVersion,
  resultMessage: AlpSessionSchema.shape.resultMessage,
  bannerId: AlpSessionSchema.shape.bannerId,
  limit: z.number().int().optional(),
});
export type ListSessionIdsRequest = z.infer<typeof filterOptions>;

export const sessionId = AlpSessionSchema.shape.sessionId;
export type SessionId = z.infer<typeof sessionId>;
export const listSessionIdsResponse = z.array(sessionId);
export type ListSessionIdsResponse = z.infer<typeof listSessionIdsResponse>;
