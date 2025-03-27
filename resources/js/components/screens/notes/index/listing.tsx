import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useNotesStore } from "@/states/notes";

import { NoteItem, NoteItemLoading } from "../note-item";

export const ListingLoading = () => {
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
    const { notes, note } = useNotesStore();

    const { containerRef, slottedItems } = useNotesReorder(notes, note);
    const { setNote } = useNotesStore();

    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10" ref={containerRef}>
            {slottedItems.map(
                ({ slotId, itemId, item }) =>
                    item && (
                        <div key={slotId} data-swapy-slot={slotId}>
                            <div
                                key={itemId}
                                data-swapy-item={itemId}
                                onClick={() => setNote(item)}
                                className="h-full w-full"
                            >
                                <NoteItem note={item} />
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
};
