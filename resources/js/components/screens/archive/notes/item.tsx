import type { TNote } from "@/types/models";

import { md } from "@/lib/md";
import { time } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon } from "lucide-react";

import { Delete } from "./delete";

export const ItemLoading = () => {
    return (
        <div className="w-full">
            <div
                className={cn(
                    "bg-secondary text-secondary-foreground",
                    "w-full overflow-hidden rounded-md",
                )}
            >
                <div className="space-y-1">
                    <div className="border-border w-full border-b px-2.5 py-1.5">
                        <Skeleton className="h-6 w-2/3" />
                    </div>
                    <div className="px-2.5 py-1.5">
                        <Skeleton className="h-[200px] w-full" />
                    </div>
                </div>
                <div className="px-2.5 py-1.5">
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
        </div>
    );
};

export const Item = ({ note, active }: { note: TNote; active?: boolean }) => {
    const { setNote } = useNotesStore();

    return (
        <div
            className={cn(
                "group bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                "w-full overflow-hidden rounded-md transition-colors duration-75",
                {
                    "bg-primary text-primary-foreground": active,
                    "text-muted-foreground": !note.name,
                },
            )}
        >
            <div onClick={() => setNote(note)} className="cursor-pointer space-y-1">
                <h3 className="border-border w-full border-b px-2.5 py-1.5 text-lg font-bold">
                    {note.name || "Title"}
                </h3>
                <p
                    className={cn(
                        "w-full overflow-hidden px-2.5 py-1.5 text-sm",
                        "h-[200px]",
                        "prose group-hover:prose-invert",
                        {
                            "prose-invert": active,
                        },
                    )}
                    dangerouslySetInnerHTML={{ __html: md.convert(note.content) }}
                />
            </div>
            <div className="flex items-center justify-between px-2.5 py-3">
                <span className="text-sm font-light">{time.format.shortt(note.created_at)}</span>
                <div className="flex space-x-3">
                    <Unarchive note={note} />
                    <Delete note={note} />
                </div>
            </div>
        </div>
    );
};

export const Unarchive = ({ note }: { note: TNote }) => {
    // const { unarchiveNote, processingNotes } = useNotesStore();
    // const isProcessing = processingNotes.includes(note.id);

    console.log(note);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            // onClick={() => unarchiveNote(note.id)}
            // disabled={isProcessing}
        >
            <ArrowLeftIcon className="h-4 w-4" />
        </Button>
    );
};
