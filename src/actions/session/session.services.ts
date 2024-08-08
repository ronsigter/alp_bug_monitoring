'use server'

import { cache } from 'react'
import * as SessionSchema from './session.schema'
import { prisma } from '@/lib/db'
import { MERCHANT_BANNER_IDS } from '@/constants/merchantBannerIds'
import { DUMMY_SESSIONS } from './dummy'

export const listErrorSessions = cache(
  async ({
    otaVersion,
  }: SessionSchema.ListErrorSessionsRequest): Promise<SessionSchema.ListErrorSessionsResponse> => {
    // Prepare the filtering conditions
    // TODO: Add support for multiple versions
    const conditions = [{ banner_id: null, alp_version: null }].map(
      (version) => ({
        banner_id: version.banner_id,
        alp_version: version.alp_version,
      })
    )

    const errorSessions = await prisma.alpSession.groupBy({
      by: ['bannerId', 'resultMessage', 'alpVersion'],
      where: {
        resultSuccess: false,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        resultMessage: {
          notIn: [
            '',
            'unable to find banner id',
            'incomplete session',
            'missing start event',
          ],
        },
        otaVersion,
      },
      _count: {
        id: true,
      },
    })

    // Sort by bannerid and total
    const mappedErrorSessions = errorSessions
      .map((errorSession) => ({
        ...errorSession,
        total: errorSession._count.id,
        bannerId: errorSession.bannerId,
        bannerName: MERCHANT_BANNER_IDS[errorSession.bannerId].name,
        priority: MERCHANT_BANNER_IDS[errorSession.bannerId].priority,
      }))
      .filter(
        (errorSession) =>
          errorSession.alpVersion ===
          MERCHANT_BANNER_IDS[errorSession.bannerId].latest_version
      )
      .sort((a, b) => {
        if (a.bannerId === b.bannerId) {
          // Total is only important when bannerId are the same
          return b.total - a.total
        }
        return a.bannerId > b.bannerId ? 1 : -1
      })

    // const mappedErrorSessions = DUMMY_SESSIONS.map((errorSession) => ({
    //   ...errorSession,
    //   bannerName: MERCHANT_BANNER_IDS[errorSession.bannerId].name,
    //   priority: MERCHANT_BANNER_IDS[errorSession.bannerId].priority,
    // }))

    return mappedErrorSessions
  }
)

// get all session ids. function accepts filter options for bannerId and resultmessage
export const listSessionIds = cache(
  async (
    filter: SessionSchema.ListSessionIdsRequest
  ): Promise<SessionSchema.ListSessionIdsResponse> => {
    const { alpVersion, bannerId, resultMessage, limit = 10 } = filter
    const sessions = await prisma.alpSession.findMany({
      where: {
        resultSuccess: false,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        bannerId,
        resultMessage,
        alpVersion,
      },
      select: {
        sessionId: true,
      },
      take: limit,
    })

    return sessions.map(({ sessionId }) => sessionId)
  }
)
