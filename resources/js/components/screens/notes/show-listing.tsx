import type { TNote } from "@/types/models";

import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { useNotesStore } from "@/states/notes";

import { NoteItem } from "./note-item";

const ShowListing = ({ notes, note }: { notes: TNote[]; note: TNote }) => {
    const { scrollIntoViewRef } = useScrollIntoView();
    const { containerRef, slottedItems } = useNotesReorder(notes);
    const { setNote } = useNotesStore();

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

export { ShowListing };
