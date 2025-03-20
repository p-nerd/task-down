import type { TNote } from "@/types/models";

import { plugins } from "@/lib/plugins";
import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

import { MDXEditor } from "@mdxeditor/editor";

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
            <MDXEditor
                key={note.id}
                markdown={note.content}
                contentEditableClassName="w-full h-[100px] overflow-hidden text-sm outline-hidden prose dark:prose-invert"
                plugins={plugins}
                readOnly={true}
            />
            <span className="text-xs font-light">{time.format.shortt(note.created_at)}</span>
        </div>
    );
};
