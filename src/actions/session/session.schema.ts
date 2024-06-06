import { type AlpSession } from '@prisma/client'

export type ErrorSession = Pick<AlpSession, 'bannerId' | 'resultMessage'>

export type ListErrorSessionsResponse = ErrorSession[]
