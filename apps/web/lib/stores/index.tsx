import useGetTypes from "../hooks/useGetTypes";
import { Type } from "../types/schema.db";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTypes } from "../utils/getTypes";

export const useTypeStore = create<{
  types: Type[];
  initializeTypes: () => Promise<void>;
  isInitialized: boolean;
}>()(
  persist(
    (set, get) => ({
      types: [],
      isInitialized: false,
      initializeTypes: async () => {
        const { isInitialized } = get();

        if (isInitialized) return;

        const res = await getTypes();
        const types = res.data;

        if (res && types?.length > 0) {
          set({ types: types, isInitialized: true });
        }
      },
    }),
    {
      name: "types",
    },
  ),
);
