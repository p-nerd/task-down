import { Button } from "@/components/ui/button";
import { NotebookPenIcon } from "lucide-react";

export const CreateNote = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size="icon" variant="outline" className="cursor-pointer" onClick={onClick}>
            <NotebookPenIcon className="h-4 w-4 transition-colors" />
        </Button>
    );
};
