import type { TNote } from "@/types/models";

import { useNotesStore } from "@/states/notes";
import { useEffect } from "react";

import { Index } from "@/components/screens/notes/index";
import { Show } from "@/components/screens/notes/show";

export default (props: { notes: TNote[]; noteId: string | null }) => {
    const { note, setNote, setNotes } = useNotesStore();

    useEffect(() => setNotes(props.notes), [props.notes]);
    useEffect(
        () => setNote(props.notes.find((n) => n.id === props.noteId) || null),
        [props.noteId, props.notes],
    );

    return <>{note ? <Show note={note} /> : <Index />}</>;
};
