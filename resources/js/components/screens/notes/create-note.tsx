import { router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { NotebookPenIcon } from "lucide-react";

export const CreateNote = () => {
    return (
        <Button
            size="icon"
            variant="outline"
            className="cursor-pointer"
            onClick={() =>
                router.post(route("notes.store"), undefined, {
                    onSuccess: () => {
                        window.location.reload();
                    },
                })
            }
        >
            <NotebookPenIcon className="h-4 w-4 transition-colors" />
        </Button>
    );
};
