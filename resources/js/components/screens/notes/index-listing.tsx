import type { TNote } from "@/types/models";
import type { SlotItemMapArray, Swapy } from "swapy";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, utils } from "swapy";

const IndexListing = ({ notes }: { notes: TNote[] }) => {
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        utils.initSlotItemMap(notes, "id"),
    );

    const slottedItems = useMemo(
        () => utils.toSlottedItems(notes, "id", slotItemMap),
        [notes, slotItemMap],
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const swapyRef = useRef<Swapy | null>(null);

    useEffect(
        () => utils.dynamicSwapy(swapyRef.current, notes, "id", slotItemMap, setSlotItemMap),
        [notes],
    );

    useEffect(() => {
        if (containerRef.current) {
            swapyRef.current = createSwapy(containerRef.current!, {
                manualSwap: true,
            });

            swapyRef.current.onSwap((event) => {
                setSlotItemMap(event.newSlotItemMap.asArray);
            });

            swapyRef.current.onSwapEnd((e) => {
                router.patch(
                    route("notes.reorder"),
                    {
                        notes: e.slotItemMap.asArray.map((t, i) => ({ id: t.item, order: i })),
                    },
                    {
                        onFinish: swapyRef.current?.update,
                    },
                );
            });
        }
        return () => {
            swapyRef.current?.destroy();
        };
    }, []);

    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10" ref={containerRef}>
            {slottedItems.map(
                ({ slotId, itemId, item }) =>
                    item && (
                        <div key={slotId} data-swapy-slot={slotId}>
                            <div
                                data-swapy-item={itemId}
                                key={itemId}
                                onClick={() => router.get(route("notes.show", item))}
                                className={cn(
                                    "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                                    "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                                )}
                            >
                                <h3 className="mb-1 w-full font-bold">{item.name}</h3>
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
