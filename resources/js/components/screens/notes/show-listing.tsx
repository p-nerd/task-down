import type { TNote } from "@/types/models";

import { useNotesReorder } from "@/hooks/use-notes-reorder";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { time } from "@/lib/time";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";

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
                                className={cn(
                                    "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                                    "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                                    {
                                        "bg-primary text-primary-foreground": item.id === note.id,
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

export { ShowListing };
