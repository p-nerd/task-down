import type { TNote } from "@/types/models";

import { time } from "@/lib/time";
import { toast } from "@/lib/toast";
import { error } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "lucide-react";

export const Archive = ({ note }: { note: TNote }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { notes, setNotes } = useNotesStore();

    const handleArchive = async () => {
        setLoading(true);
        const orNotes = [...notes];

        try {
            setNotes(orNotes.filter((n) => n.id !== note.id));
            await window.axios.patch(route("notes.update", note), { archive_at: time.date.now() });
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
                handleArchive();
            }}
            title="Archive"
            className="cursor-pointer"
        >
            <ArchiveIcon size={16} />
        </Button>
    );
};
