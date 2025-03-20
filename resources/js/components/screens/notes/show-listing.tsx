import type { TNote } from "@/types/models";

import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { router } from "@inertiajs/react";

import { NoteItem } from "./note-item";

const ShowListing = ({ notes, note }: { notes: TNote[]; note: TNote }) => {
    const { scrollIntoViewRef } = useScrollIntoView();
    const { containerRef, slottedItems } = useNotesReorder(notes);

    return (
        <div className="flex flex-col space-y-2" ref={containerRef}>
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
                                onClick={() => router.get(route("notes.show", item))}
                                className="h-full w-full"
                            >
                                <NoteItem note={item} active={item.id === note.id} />
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
};

export { ShowListing };
