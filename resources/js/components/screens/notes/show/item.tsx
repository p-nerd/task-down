import type { TNote } from "@/types/models";

import { md } from "@/lib/md";
import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

export const NoteItemLoading = () => {
    return (
        <div className="w-full">
            <div className="h-full w-full">
                <div className="bg-secondary w-full rounded-md px-2.5 py-3">
                    <Skeleton className="mb-1 h-6 w-2/3" />
                    <Skeleton className="h-[100px] w-full" />
                    <Skeleton className="mt-1 h-3 w-1/4" />
                </div>
            </div>
        </div>
    );
};

export const NoteItem = ({
    note,
    active,
    strikable,
}: {
    note: TNote;
    active?: boolean;
    strikable?: boolean;
}) => {
    return (
        <div
            className={cn(
                "group bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                {
                    "bg-primary text-primary-foreground": active,
                    "text-muted-foreground": !note.name,
                },
            )}
        >
            <h3 className="mb-1 w-full text-base font-bold">{note.name || "Untitled Title"}</h3>
            <p
                className={cn(
                    "w-full overflow-hidden text-sm",
                    strikable ? "max-h-[100px]" : "h-[100px]",
                    "prose group-hover:prose-invert",
                    {
                        "prose-invert": active,
                    },
                )}
                dangerouslySetInnerHTML={{ __html: md.convert(note.content) }}
            />
            <span className="text-xs font-light">{time.format.shortt(note.created_at)}</span>
        </div>
    );
};
