import { cn } from "@/lib/utils";

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
            <NotebookPenIcon
                className={cn("h-4 w-4 transition-colors", {
                    "animate-pulse": pending,
                })}
            />
        </Button>
    );
};
