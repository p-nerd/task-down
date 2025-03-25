import { router } from "@inertiajs/react";

import { Trash2Icon } from "lucide-react";

export const DeleteNote = ({ noteId }: { noteId: string }) => {
    return (
        <button
            className="group cursor-pointer"
            onClick={() => router.delete(route("notes.destroy", noteId), { data: { show: true } })}
        >
            <Trash2Icon className="h-4.5 w-4.5 transition-colors group-hover:text-red-500" />
        </button>
    );
};
