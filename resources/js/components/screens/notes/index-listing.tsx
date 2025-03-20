import type { TNote } from "@/types/models";
import type { Swapy } from "swapy";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";

const IndexListing = ({ notes }: { notes: TNote[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const swapyRef = useRef<Swapy | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            swapyRef.current = createSwapy(containerRef.current, { animation: "spring" });

            swapyRef.current.onSwapEnd((e) => {
                console.log(e);

                const orderMaps = notes.reduce<Record<string, number>>((acc, note) => {
                    acc[note.id] = note.order;
                    return acc;
                }, {});
                console.log(orderMaps);

                const data = e.slotItemMap.asArray.map((item) => {
                    if (item.slot === item.item) {
                        return {
                            id: item.item,
                            order: orderMaps[item.item],
                        };
                    }
                    return {
                        id: item.item,
                        order: orderMaps[item.slot],
                    };
                });
                console.log(notes, data);

                router.patch(route("notes.reorder"), { notes: data });
                swapyRef.current?.update();
            });
        }

        return () => {
            swapyRef.current?.destroy();
        };
    }, []);

    return (
        <div className="grid w-full grid-cols-4 gap-3 px-10" ref={containerRef}>
            {notes.map((n) => (
                <div key={n.id} data-swapy-slot={n.id}>
                    <div
                        key={n.id}
                        data-swapy-item={n.id}
                        onClick={() => router.get(route("notes.show", n))}
                        className={cn(
                            "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                            "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                        )}
                    >
                        <h3 className="mb-1 w-full font-bold">{n.name}</h3>
                        <span className="text-xs font-light">
                            {time.format.shortt(n.created_at)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { IndexListing };
