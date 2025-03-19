import {
    headingsPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
} from "@mdxeditor/editor";

import type { TNote } from "@/types/models";

import { useCallback, useRef } from "react";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { App2Layout } from "@/layouts/app2-layout";
import { Link } from "@inertiajs/react";
import { MDXEditor } from "@mdxeditor/editor";
import { LayoutGridIcon, NotebookPenIcon, Trash2Icon } from "lucide-react";

const plugins = [
    // basic
    headingsPlugin(),
    quotePlugin(),
    listsPlugin(),
    thematicBreakPlugin(),

    // links
    linkPlugin(),

    // tables
    tablePlugin(),

    // markdown shortcuts
    markdownShortcutPlugin(),
];

const Editor = ({
    id,
    content,
    onUpdate,
}: {
    id?: string;
    content: string;
    onUpdate: (content: string) => void;
}) => {
    const timeoutRef = useRef<any>(null);

    const handleContentChange = useCallback(
        (content: string) => {
            if (!id) return;

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a new timeout for debouncing
            timeoutRef.current = setTimeout(() => {
                if (content) {
                    onUpdate(content);
                }
            }, 500); // Debounce for 500ms
        },
        [id, onUpdate],
    );

    if (!id) return null;

    return (
        <MDXEditor
            key={id}
            markdown={content}
            onChange={handleContentChange}
            contentEditableClassName="w-full h-full text-lg outline-hidden prose dark:prose-invert text-foreground bg-background"
            plugins={plugins}
        />
    );
};

const Note = ({ note, notes }: { note: TNote; notes: TNote[] }) => {
    const contentHeight = "calc(100vh - 130px)";

    return (
        <App2Layout className="flex h-full w-full flex-col">
            <div className="flex w-full justify-between pt-6">
                <div className="flex w-[300px] justify-between">
                    <Button size="icon" variant="outline" className="cursor-pointer">
                        <NotebookPenIcon className="h-4 w-4 transition-colors" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {}}
                    >
                        <Trash2Icon
                            className={cn("h-4 w-4 transition-colors group-hover:text-red-500", {
                                "animate-pulse text-red-500": false,
                            })}
                        />
                    </Button>
                </div>
                <Link href={route("notes.index")}>
                    <Button size="icon" variant="outline" className="cursor-pointer">
                        <LayoutGridIcon className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="flex h-full w-full py-2">
                <div
                    className="w-[300px] space-y-4 overflow-y-auto"
                    style={{ height: contentHeight }}
                >
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <ul className="flex flex-col space-y-2">
                            {notes.map((n) => (
                                <Link key={n.id} href={route("notes.show", n)}>
                                    <li
                                        className={cn(
                                            "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                                            "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                                            {
                                                "bg-primary text-primary-foreground":
                                                    n.id === note.id,
                                            },
                                        )}
                                    >
                                        <h3 className="mb-1 w-full font-bold">{n.name}</h3>
                                        <span className="text-xs font-light">
                                            {time.format.shortt(n.created_at)}
                                        </span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto px-8" style={{ height: contentHeight }}>
                    <Editor id={note?.id} content={note?.content || ""} onUpdate={() => {}} />
                </div>
            </div>
        </App2Layout>
    );
};

export default Note;
