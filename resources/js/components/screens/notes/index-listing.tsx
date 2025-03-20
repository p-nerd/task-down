import type { TNote } from "@/types/models";

import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { time } from "@/lib/time";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";

const IndexListing = ({ notes }: { notes: TNote[] }) => {
    const { containerRef, slottedItems } = useNotesReorder(notes);

    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10" ref={containerRef}>
            {slottedItems.map(
                ({ slotId, itemId, item }) =>
                    item && (
                        <div key={slotId} data-swapy-slot={slotId}>
                            <div
                                key={itemId}
                                data-swapy-item={itemId}
                                onClick={() => router.get(route("notes.show", item))}
                                className={cn(
                                    "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                                    "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                                    {
                                        "text-muted-foreground": !item.name,
                                    },
                                )}
                            >
                                <h3 className="mb-1 w-full text-base font-bold">
                                    {item.name || "Untitled Title"}
                                </h3>
                                <span className="text-xs font-light">
                                    {time.format.shortt(item.created_at)}
                                </span>
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
};
export { IndexListing };
