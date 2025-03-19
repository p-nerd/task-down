import { router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteNote = ({ noteId }: { noteId: string }) => {
    return (
        <Button
            size="icon"
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
                router.delete(route("notes.destroy", noteId), { data: { show: true } });
            }}
        >
            <Trash2Icon className="h-4 w-4 transition-colors group-hover:text-red-500" />
        </Button>
    );
};
