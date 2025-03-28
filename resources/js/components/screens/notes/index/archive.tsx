import type { TNote } from "@/types/models";

import { ArchiveIcon } from "lucide-react";

export const Archive = ({ note }: { note: TNote }) => {
    console.log(note);

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
            }}
            title="Archive"
            className="cursor-pointer"
        >
            <ArchiveIcon size={16} />
        </button>
    );
};
