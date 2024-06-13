import { create } from 'zustand'

type SessionValue = {
  sessionIds: string[]
  alpVersion: string
  bannerId: number
  resultMessage: string | null
}

type UseSessionIdsStore = {
  sessionIds: Map<string, SessionValue>
  onAddSessionIds: (key: string, value: SessionValue) => void
}

export const useSessionIdsStore = create<UseSessionIdsStore>((set, get) => ({
  sessionIds: new Map(),
  onAddSessionIds: (key, value) => {
    set({ sessionIds: get().sessionIds.set(key, value) })
  },
}))
