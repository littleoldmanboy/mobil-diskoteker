import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";

export const useChoiceStore = createWithEqualityFn(
  persist(
    (set) => ({
      choices: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      setChoice: (step, value) =>
        set((state) => ({ choices: { ...state.choices, [step]: value } })),
      resetChoices: () =>
        set({
          choices: { 1: null, 2: null, 3: null, 4: null },
        }),

      activeStep: 0,
      setActiveStep: (step) => set({ activeStep: step }),
    }),
    {
      name: "choice-store",
    }
  )
);
