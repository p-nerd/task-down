import type { TNote } from "@/types/models";

import { time } from "@/lib/time";
import { toast } from "@/lib/toast";
import { cn, error } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pin as PinIcon } from "lucide-react";

export const Pin = ({ note }: { note: TNote }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { notes, setNotes } = useNotesStore();

    const handlePin = async () => {
        setLoading(true);
        const orNotes = [...notes];

        try {
            const pin_at = !note.pin_at ? time.date.now() : null;
            setNotes(notes.map((n) => (n.id === note.id ? { ...n, pin_at } : n)));
            await window.axios.patch(route("notes.update", note), { pin_at });
        } catch (e) {
            setNotes(orNotes);
            toast.error(error(e));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={(e) => {
                e.stopPropagation();
                handlePin();
            }}
            title={note.pin_at ? "Unpin" : "Pin"}
            className={cn("cursor-pointer", note.pin_at && "text-yellow-500 hover:text-yellow-600")}
        >
            <PinIcon size={16} />
        </Button>
    );
};
