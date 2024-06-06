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
    const errorSessions = await prisma.alpSession.findMany({
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
      take: 100,
    })

    return errorSessions
  }
)
