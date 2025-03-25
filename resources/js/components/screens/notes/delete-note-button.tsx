import { useNotesStore } from "@/states/notes";
import { router } from "@inertiajs/react";
import { useState } from "react";

import { Confirmation } from "@/components/elements/confirmation";
import { Trash2Icon } from "lucide-react";

export const DeleteNoteButton = ({ noteId }: { noteId: string }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { sidebarVisible } = useNotesStore();

    return (
        <>
            <button className="group cursor-pointer" onClick={() => setOpen(true)}>
                <Trash2Icon className="h-4.5 w-4.5 transition-colors group-hover:text-red-500" />
            </button>
            <Confirmation
                open={open}
                onOpen={setOpen}
                confirmActionText="Delete"
                onConfirmAction={() => {
                    router.delete(route("notes.destroy", noteId), {
                        data: { show: sidebarVisible },
                    });
                }}
            />
        </>
    );
};
