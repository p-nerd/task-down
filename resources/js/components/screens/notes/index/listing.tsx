import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useNotesStore } from "@/states/notes";

import { Skeleton } from "@/components/ui/skeleton";
import { NoteItem } from "../note-item";

export const ListingLoading = () => {
    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10 py-5">
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="w-full">
                        <div className="h-full w-full">
                            <div className="bg-secondary w-full rounded-md px-2.5 py-3">
                                <Skeleton className="mb-1 h-6 w-2/3" />
                                <Skeleton className="h-[100px] w-full" />
                                <Skeleton className="mt-1 h-3 w-1/4" />
                            </div>
                        </div>
                    </div>
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
