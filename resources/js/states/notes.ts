import type { TNote } from "@/types/models";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useNotesStore = create(
    immer<{
        notes: TNote[];
        setNotes: (notes: TNote[]) => void;
        sidebarVisible: boolean;
        setSidebarVisible: (value: boolean) => void;
    }>((set) => ({
        notes: [],
        setNotes: (notes) => set({ notes }),
        sidebarVisible: true,
        setSidebarVisible: (value) => set({ sidebarVisible: value }),
    })),
);
