import type { TNote } from "@/types/models";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TEditorMode = "rich" | "markdown";

export const useNotesStore = create(
    immer<{
        note: TNote | null;
        setNote: (note: TNote | null) => void;

        notes: TNote[];
        setNotes: (notes: TNote[]) => void;
        updateNote: (note: TNote) => void;

        archiveNotes: TNote[];
        setArchiveNotes: (archiveNotes: TNote[]) => void;

        sidebarVisible: boolean | null;
        setSidebarVisible: (sidebarVisible: boolean) => void;

        editorMode: TEditorMode | null;
        setEditorMode: (editorMode: TEditorMode | null) => void;

        selectedNoteIds: string[];
        setSelectNoteIds: (selectedNoteIds: string[]) => void;
    }>((set) => ({
        note: null,
        setNote: (note) => set({ note }),

        notes: [],
        setNotes: (notes) => set({ notes }),
        updateNote: (note) => {
            set((s) => {
                s.notes = s.notes.map((n) => (n.id === note.id ? note : n));
                if (s.note?.id === note.id) {
                    s.note = note;
                }
            });
        },

        archiveNotes: [],
        setArchiveNotes: (archiveNotes) => set({ archiveNotes }),

        sidebarVisible: null,
        setSidebarVisible: (sidebarVisible) => set({ sidebarVisible }),

        editorMode: null,
        setEditorMode: (editorMode) => set({ editorMode }),

        selectedNoteIds: [],
        setSelectNoteIds: (selectedNoteIds) => set({ selectedNoteIds }),
    })),
);
