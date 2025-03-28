import type { TNote } from "@/types/models";

import { toast } from "@/lib/toast";
import { error } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const Delete = ({ note }: { note: TNote }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { notes, setNotes } = useNotesStore();

    const handleDelete = async () => {
        setLoading(true);
        const orNotes = [...notes];

        try {
            setNotes(orNotes.filter((n) => n.id !== note.id));
            await window.axios.delete(route("notes.destroy", note));
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
            onClick={(e) => {
                e.stopPropagation();
                handleDelete();
            }}
            disabled={loading}
            title="Delete"
            className="cursor-pointer"
        >
            <TrashIcon size={16} />
        </Button>
    );
};
