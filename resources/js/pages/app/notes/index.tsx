import type { TNote } from "@/types/models";

import { useNotesStore } from "@/states/notes";
import { useEffect } from "react";

import { Note } from "@/components/screens/notes/note";
import { Notes } from "@/components/screens/notes/notes";

const NotesPage = (props: { notes: TNote[]; noteId: string | null }) => {
    const { note, setNote, setNotes } = useNotesStore();

    useEffect(() => setNotes(props.notes), [props.notes]);
    useEffect(
        () => setNote(props.notes.find((n) => n.id === props.noteId) || null),
        [props.noteId, props.notes],
    );

    return <>{note ? <Note note={note} /> : <Notes />}</>;
};

export default NotesPage;
