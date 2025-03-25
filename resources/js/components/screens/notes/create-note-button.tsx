import { useNotesStore } from "@/states/notes";
import { router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { NotebookPenIcon } from "lucide-react";

export const CreateNoteButton = () => {
    const { setNotes } = useNotesStore();

    return (
        <Button
            size="icon"
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
                router.post(route("notes.store"), undefined, {
                    onFinish: () => {
                        setNotes([]);
                    },
                });
            }}
        >
            <NotebookPenIcon className="h-4 w-4 transition-colors" />
        </Button>
    );
};
