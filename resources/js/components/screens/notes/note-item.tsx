import type { TNote } from "@/types/models";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

export const NoteItem = ({ note, active }: { note: TNote; active?: boolean }) => {
    return (
        <div
            className={cn(
                "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                {
                    "bg-primary text-primary-foreground": active,
                    "text-muted-foreground": !note.name,
                },
            )}
        >
            <h3 className="mb-1 w-full text-base font-bold">{note.name || "Untitled Title"}</h3>
            <span className="text-xs font-light">{time.format.shortt(note.created_at)}</span>
        </div>
    );
};
