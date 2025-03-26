import type { TNote } from "@/types/models";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TEditorMode = "rich" | "markdown";

export const useNotesStore = create(
    immer<{
        notes: TNote[];
        setNotes: (notes: TNote[]) => void;
        sidebarVisible: boolean | null;
        setSidebarVisible: (sidebarVisible: boolean) => void;
        editorMode: TEditorMode | null;
        setEditorMode: (editorMode: TEditorMode | null) => void;
    }>((set) => ({
        notes: [],
        setNotes: (notes) => set({ notes }),
        sidebarVisible: null,
        setSidebarVisible: (sidebarVisible) => set({ sidebarVisible }),
        editorMode: null,
        setEditorMode: (editorMode) => set({ editorMode }),
    })),
);
