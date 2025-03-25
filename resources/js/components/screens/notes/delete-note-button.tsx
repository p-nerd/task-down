import { useNotesStore } from "@/states/notes";
import { router } from "@inertiajs/react";

import { Confirmation } from "@/components/elements/confirmation";
import { Trash2Icon } from "lucide-react";

export const DeleteNoteButton = ({ noteId }: { noteId: string }) => {
    const { sidebarVisible } = useNotesStore();

    return (
        <>
            <Confirmation
                actionText="Delete"
                onAction={() => {
                    router.delete(route("notes.destroy", noteId), {
                        data: { show: sidebarVisible },
                    });
                }}
            >
                <button className="group cursor-pointer">
                    <Trash2Icon className="h-4.5 w-4.5 transition-colors group-hover:text-red-500" />
                </button>
            </Confirmation>
        </>
    );
};
