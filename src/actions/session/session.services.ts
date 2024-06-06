'use server'

import { cache } from 'react'
import * as SessionSchema from './session.schema'
import { prisma } from '@/lib/db'

/*
SELECT regexp_replace(regexp_replace(result_message, '^\s+', ''), '\s+$', ''), count(id) AS total, banner_id, platform

-- TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD') AS date

FROM alp_sessions
WHERE result_success IS false
	AND created_at >= CURRENT_DATE - INTERVAL '2 days' 
	AND result_message NOT IN ('','unable to find banner id', 'incomplete session', 'missing start event')
GROUP BY banner_id, platform, result_message;

*/

export const listErrorSessions = cache(
  async (): Promise<SessionSchema.ListErrorSessionsResponse> => {
    const errorSessions = await prisma.alpSession.groupBy({
      by: ['bannerId', 'resultMessage'],
      where: {
        resultSuccess: false,
        createdAt: {
          gte: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        resultMessage: {
          notIn: [
            '',
            'unable to find banner id',
            'incomplete session',
            'missing start event',
          ],
        },
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
      }))
      .sort((a, b) => {
        if (a.bannerId === b.bannerId) {
          // Total is only important when bannerId are the same
          return b.total - a.total
        }
        return a.bannerId > b.bannerId ? 1 : -1
      })

    return mappedErrorSessions
  }
)
