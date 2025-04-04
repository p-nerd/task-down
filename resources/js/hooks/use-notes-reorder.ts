import type { TNote } from "@/types/models";
import type { SlotItemMapArray, Swapy } from "swapy";

import { toast } from "@/lib/toast";
import { error } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, utils } from "swapy";

export const useNotesReorder = (notes: TNote[], note: TNote | null) => {
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
                animation: "spring",
            });

            swapyRef.current.onSwap((e) => {
                setSlotItemMap(e.newSlotItemMap.asArray);
            });

            swapyRef.current.onSwapEnd((e) => {
                if (!e.hasChanged) return;

                window.axios
                    .patch(route("notes.reorder"), {
                        notes: e.slotItemMap.asArray.map((t, i) => ({ id: t.item, order: i })),
                        selected_note_id: note?.id || null,
                    })
                    .then(() => {
                        if (swapyRef.current?.update) {
                            swapyRef.current.update();
                        }
                    })
                    .catch((e) => {
                        toast.error(error(e));
                    });
            });
        }
        return () => {
            swapyRef.current?.destroy();
        };
    }, []);

    return { containerRef, slottedItems };
};
