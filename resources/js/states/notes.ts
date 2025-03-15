import type { TViewMode } from "@/types/utils";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useNotes = create<{
    viewMode: TViewMode;
    setViewMode: (viewMode: TViewMode) => void;
    activeNoteId: string | null;
    setActiveNoteId: (id: string | null) => void;
}>()(
    devtools(
        immer((set) => ({
            viewMode: "list",
            setViewMode: (viewMode: TViewMode) => {
                set((s) => {
                    s.viewMode = viewMode;
                });
            },
            activeNoteId: null,
            setActiveNoteId: (id) => {
                set((s) => {
                    s.activeNoteId = id;
                });
            },
        })),
    ),
);
