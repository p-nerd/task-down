import { Button } from "@/components/ui/button";
import { NotebookPenIcon } from "lucide-react";

export const CreateNote = () => {
    const pending = false;

    return (
        <Button
            size="icon"
            variant="outline"
            className="group"
            disabled={pending}
            onClick={() => {}}
        >
            <NotebookPenIcon className="h-4 w-4 transition-colors" />
        </Button>
    );
};
