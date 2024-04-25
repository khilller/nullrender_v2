import { create } from "zustand"

interface credit {
    freeCredit: number
    setFreeCredit: (freeCredit: number) => void
}

export const useCreditStore = create<credit>((set) => ({
    freeCredit: 0,
    setFreeCredit: (freeCredit) => set({ freeCredit })
}))