import { useNotesStore } from "@/states/notes";

import { NoteItem, NoteItemLoading } from "../note-item";

export const Loading = () => {
    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10 py-5">
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <NoteItemLoading key={index} />
                ))}
        </div>
    );
};

export const Listing = () => {
    const { notes, setNote } = useNotesStore();

    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10">
            {notes.map((n, i) => (
                <div key={i} onClick={() => setNote(n)} className="h-full w-full">
                    <NoteItem note={n} />
                </div>
            ))}
        </div>
    );
};
