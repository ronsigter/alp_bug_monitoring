import { create } from 'zustand'

type UseFormSheetStore = {
  openedSheets: Set<string>
  onOpenSheet: (key: string) => void
  onCloseSheet: (key: string) => void
  toggleSheet: (key: string) => void
}

export const useFormSheetStore = create<UseFormSheetStore>((set, get) => ({
  openedSheets: new Set<string>(),
  onOpenSheet: (key) => {
    set({ openedSheets: get().openedSheets.add(key) })
  },
  onCloseSheet: (key) => {
    const sheets = get().openedSheets
    sheets.delete(key)
    set({ openedSheets: sheets })
  },
  toggleSheet: (key) => {
    const isOpen = get().openedSheets.has(key)
    isOpen ? get().onCloseSheet(key) : get().onOpenSheet(key)
  },
}))
