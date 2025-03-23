import type { TNote } from "@/types/models";
import { router } from "@inertiajs/react";

import { useEffect, useState } from "react";

export const useNotes = (passNotes: TNote[]) => {
    const [notes, setNotes] = useState<TNote[]>([]);

    useEffect(() => {
        setNotes(passNotes);
    }, [passNotes]);

    const handleCreateNote = () => {
        router.post(route("notes.store"), undefined, {
            onFinish: () => {
                setNotes([]);
            },
        });
    };

    const handleDeleteNote = (noteId: string, options: { show?: boolean }) => {
        router.delete(route("notes.destroy", noteId), { data: { show: options.show } });
    };

    return { notes, handleCreateNote, handleDeleteNote };
};
