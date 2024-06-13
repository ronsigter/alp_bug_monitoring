import { create } from 'zustand'

type UseSessionIdsStore = {
  sessionIds: Map<string, string[]>
  onAddSessionIds: (key: string, value: string[]) => void
}

export const useSessionIdsStore = create<UseSessionIdsStore>((set, get) => ({
  sessionIds: new Map(),
  onAddSessionIds: (key, value) => {
    set({ sessionIds: get().sessionIds.set(key, value) })
  },
}))
