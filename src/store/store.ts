import { create } from 'zustand'

interface AppState {
    isRenameModalOpen: boolean
    setIsRenameModalOpen: (open: boolean) => void

    isDeleteModalOpen: boolean
    setIsDeleteModalOpen: (open: boolean) => void

    fileId: string | null
    setFileId: (fileId: string) => void

    fileName: string | null
    setFileName: (fileId: string) => void
}

export const useAppStore = create<AppState>((set) => ({
    isRenameModalOpen: false,
    setIsRenameModalOpen: (open: boolean) => set((state) => ({ isRenameModalOpen: open })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open: boolean) => set((state) => ({ isDeleteModalOpen: open })),

    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ fileId })),

    fileName: null,
    setFileName: (fileName: string) => set((state) => ({ fileName })),
}))