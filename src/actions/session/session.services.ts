"use server";

import { cache } from "react";
import * as SessionSchema from "./session.schema";
import { prisma } from "@/lib/db";
import { MERCHANT_BANNER_IDS } from "@/constants/merchantBannerIds";

export const listErrorSessions = cache(
  async (): Promise<SessionSchema.ListErrorSessionsResponse> => {
    const errorSessions = await prisma.alpSession.groupBy({
      by: ["bannerId", "resultMessage", "alpVersion"],
      where: {
        resultSuccess: false,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        resultMessage: {
          notIn: [
            "",
            "unable to find banner id",
            "incomplete session",
            "missing start event",
          ],
        },
      },
      _count: {
        id: true,
      },
    });

    // Sort by bannerid and total
    const mappedErrorSessions = errorSessions
      .map((errorSession) => ({
        ...errorSession,
        total: errorSession._count.id,
        bannerId: errorSession.bannerId,
        bannerName: MERCHANT_BANNER_IDS[errorSession.bannerId]?.name || "",
        priority: MERCHANT_BANNER_IDS[errorSession.bannerId]?.priority || 0,
      }))
      .sort((a, b) => {
        if (a.bannerId === b.bannerId) {
          return b.total - a.total;
        }
        return a.bannerId > b.bannerId ? 1 : -1;
      });

    return mappedErrorSessions;
  }
);

// get all session ids. function accepts filter options for bannerId and resultmessage
export const listSessionIds = cache(
  async (
    filter: SessionSchema.ListSessionIdsRequest
  ): Promise<SessionSchema.ListSessionIdsResponse> => {
    const { alpVersion, bannerId, resultMessage, limit = 10 } = filter;
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
    });

    return sessions.map(({ sessionId }) => sessionId);
  }
);
