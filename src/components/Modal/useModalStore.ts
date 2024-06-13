import { create } from 'zustand'

type UseModalStore = {
  openedModals: Set<string>
  onOpenModal: (key: string) => void
  onCloseModal: (key: string) => void
  toggleModal: (key: string) => void
}

export const useModalStore = create<UseModalStore>((set, get) => ({
  openedModals: new Set<string>(),
  onOpenModal: (key) => {
    set({ openedModals: get().openedModals.add(key) })
  },
  onCloseModal: (key) => {
    const modals = get().openedModals
    modals.delete(key)
    set({ openedModals: modals })
  },
  toggleModal: (key) => {
    const isOpen = get().openedModals.has(key)
    isOpen ? get().onCloseModal(key) : get().onOpenModal(key)
  },
}))
