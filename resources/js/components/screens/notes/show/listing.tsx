import type { TNote } from "@/types/models";

import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { useNotesStore } from "@/states/notes";

import { NoteItem, NoteItemLoading } from "../note-item";

export const ListingLoading = () => {
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

export const Listing = ({ note }: { note: TNote }) => {
    const { scrollIntoViewRef } = useScrollIntoView();

    const { notes, setNote } = useNotesStore();

    const { containerRef, slottedItems } = useNotesReorder(notes, note);

    return (
        <div className="flex flex-col space-y-2 pr-4" ref={containerRef}>
            {slottedItems.map(
                ({ slotId, itemId, item }) =>
                    item && (
                        <div
                            ref={item.id === note.id ? scrollIntoViewRef : null}
                            key={slotId}
                            data-swapy-slot={slotId}
                        >
                            <div
                                key={itemId}
                                data-swapy-item={itemId}
                                onClick={() => setNote(item)}
                                className="h-full w-full"
                            >
                                <NoteItem
                                    note={item}
                                    active={item.id === note.id}
                                    strikable={true}
                                />
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
};
