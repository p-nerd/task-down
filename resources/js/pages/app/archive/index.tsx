import type { TNote } from "@/types/models";

import { useNotesStore } from "@/states/notes";
import { useEffect } from "react";

import { Notes } from "@/components/screens/archive/notes";

const Page = (props: { notes: TNote[] }) => {
    const { setArchiveNotes } = useNotesStore();

    useEffect(() => setArchiveNotes(props.notes), [props.notes]);

    return <Notes />;
};

export default Page;
