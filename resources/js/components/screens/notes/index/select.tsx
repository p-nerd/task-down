import type { TNote } from "@/types/models";

import { useNotesStore } from "@/states/notes";

import { CheckCircleIcon } from "lucide-react";

export const Select = ({ note }: { note: TNote }) => {
    const { selectedNoteIds, setSelectNoteIds } = useNotesStore();

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                if (selectedNoteIds.find((id) => id === note.id)) {
                    setSelectNoteIds(selectedNoteIds.filter((id) => id !== note.id));
                } else {
                    setSelectNoteIds([...selectedNoteIds, note.id]);
                }
            }}
            className="bg-primary-foreground text-primary absolute top-2 right-2 z-10 cursor-pointer rounded-full"
        >
            <CheckCircleIcon className="h-6 w-6" />
        </button>
    );
};
