import type { TNote } from "@/types/models";
import type { SlotItemMapArray, Swapy } from "swapy";

import { router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, utils } from "swapy";

export const useNotesReorder = (notes: TNote[]) => {
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
        [notes, slotItemMap, setSlotItemMap],
    );

    useEffect(() => {
        if (containerRef.current) {
            swapyRef.current = createSwapy(containerRef.current!, {
                manualSwap: true,
                animation: "spring",
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

    return { containerRef, slottedItems };
};
