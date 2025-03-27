import type { TNote } from "@/types/models";

import { useNotesStore } from "@/states/notes";
import { useEffect } from "react";

import { Note } from "@/components/screens/notes/note";
import { Notes } from "@/components/screens/notes/notes";

const NotesPage = (props: { notes: TNote[] }) => {
    const { note, setNotes } = useNotesStore();

    useEffect(() => setNotes(props.notes), [props.notes]);

    return <>{note ? <Note note={note} /> : <Notes />}</>;
};

export default NotesPage;
