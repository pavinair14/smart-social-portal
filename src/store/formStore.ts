import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormDraft } from '@/components/types';
import { defaultFormValues } from '@/components/constant';

type FormStore = {
    data: FormDraft;
    activeStep: number;
    setField: <K extends keyof FormDraft>(key: K, value: FormDraft[K]) => void;
    setBulk: (values: Partial<FormDraft>) => void;
    setActiveStep: (step: number) => void;
    reset: () => void;
};

export const useFormStore = create<FormStore>()(
    persist(
        (set) => ({
            data: defaultFormValues as FormDraft,
            activeStep: 0,
            setField: (key, value) => set((s) => ({ data: { ...s.data, [key]: value } })),
            setBulk: (values) => set((s) => ({ data: { ...s.data, ...values } })),
            setActiveStep: (step) => set({ activeStep: step }),
            reset: () => set({ data: defaultFormValues as FormDraft, activeStep: 0 }),
        }),
        {
            name: 'smart-step-form',
            partialize: (state) => ({ data: state.data }),
        }
    )
);
