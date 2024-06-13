import { create } from 'zustand'

type SessionValue = {
  sessionIds: string[]
  alpVersion: string
  bannerId: number
  bannerName: string
  resultMessage: string | null
}

type UseSessionIdsStore = {
  sessionIds: Map<string, SessionValue>
  onAddSessionIds: (key: string, value: SessionValue) => void
  selectedSession: SessionValue | null
}

export const useSessionIdsStore = create<UseSessionIdsStore>((set, get) => ({
  sessionIds: new Map(),
  onAddSessionIds: (key, value) => {
    set({ sessionIds: get().sessionIds.set(key, value) })
  },
  selectedSession: null,
}))
