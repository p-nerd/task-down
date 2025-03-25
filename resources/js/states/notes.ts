import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useNotesStore = create(
    immer<{
        sidebarVisible: boolean;
        setSidebarVisible: (value: boolean) => void;
    }>((set) => ({
        sidebarVisible: true,
        setSidebarVisible: (value) => set({ sidebarVisible: value }),
    })),
);
