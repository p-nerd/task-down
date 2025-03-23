import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteNote = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size="icon" variant="outline" className="cursor-pointer" onClick={onClick}>
            <Trash2Icon className="h-4 w-4 transition-colors group-hover:text-red-500" />
        </Button>
    );
};
