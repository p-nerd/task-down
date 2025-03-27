import type { TNote } from "@/types/models";

import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useNotesStore } from "@/states/notes";

import { NoteItem } from "../note-item";

export const Listing = ({ notes }: { notes: TNote[] }) => {
    const { containerRef, slottedItems } = useNotesReorder(notes);
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
