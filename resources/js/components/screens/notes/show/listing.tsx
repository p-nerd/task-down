import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { useNotesStore } from "@/states/notes";

import { NoteItem, NoteItemLoading } from "../note-item";

export const Loading = () => {
    return (
        <div className="flex flex-col space-y-2 py-5 pr-4">
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <NoteItemLoading key={index} />
                ))}
        </div>
    );
};

export const Listing = () => {
    const { note, notes, setNote } = useNotesStore();

    const { scrollIntoViewRef } = useScrollIntoView([notes]);

    return (
        <div className="flex flex-col space-y-2 pr-4">
            {notes.map((n) => (
                <div ref={n.id === note?.id ? scrollIntoViewRef : null}>
                    <div onClick={() => setNote(n)} className="h-full w-full">
                        <NoteItem note={n} active={n.id === note?.id} strikable={true} />
                    </div>
                </div>
            ))}
        </div>
    );
};
