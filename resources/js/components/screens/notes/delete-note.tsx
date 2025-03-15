import { cn } from "@/lib/utils";
import { useNotes } from "@/states/notes";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteNote = () => {
    const { activeNoteId } = useNotes();

    const isPending = false;

    return (
        <Button
            size="icon"
            variant="outline"
            className="group"
            disabled={!activeNoteId || isPending}
            onClick={() => {
                if (activeNoteId) {
                }
            }}
        >
            <Trash2Icon
                className={cn("h-4 w-4 transition-colors group-hover:text-red-500", {
                    "animate-pulse text-red-500": isPending,
                })}
            />
        </Button>
    );
};
