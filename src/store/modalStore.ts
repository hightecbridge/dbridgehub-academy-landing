// src/store/modalStore.ts
import { create } from 'zustand'

type ModalTab = 'signup' | 'login'
export type SignupStep = 1 | 2 | 'done'

interface ModalState {
  isOpen: boolean
  tab: ModalTab
  step: SignupStep
  selectedPlan: string
  open: (tab?: ModalTab, plan?: string) => void
  close: () => void
  setTab: (tab: ModalTab) => void
  setStep: (step: SignupStep) => void
  setPlan: (plan: string) => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  tab: 'signup',
  step: 1,
  selectedPlan: 'standard',

  open: (tab = 'signup', plan) => set({
    isOpen: true,
    tab,
    step: 1,
    selectedPlan: plan ?? 'standard',
  }),

  close: () => set({ isOpen: false, step: 1 }),
  setTab: (tab) => set({ tab, step: 1 }),
  setStep: (step) => set({ step }),
  setPlan: (selectedPlan) => set({ selectedPlan }),
}))
