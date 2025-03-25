import { Trash2Icon } from "lucide-react";

export const DeleteNote = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className="group cursor-pointer" onClick={onClick}>
            <Trash2Icon className="h-4.5 w-4.5 transition-colors group-hover:text-red-500" />
        </button>
    );
};
