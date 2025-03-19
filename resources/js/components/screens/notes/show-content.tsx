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
import type { ChangeEvent } from "react";

import { time } from "@/lib/time";
import { router } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { MDXEditor } from "@mdxeditor/editor";

const ShowContent = ({ note }: { note: TNote }) => {
    const [noteName, setNoteName] = useState(note.name);

    const timeoutRef = useRef<any>(null);

    useEffect(() => {
        setNoteName(note.name);
    }, [note.id, note.name]);

    const handleTitleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!note.id) return;
            const name = event.target.value;
            setNoteName(name);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                if (name) {
                    router.patch(
                        route("notes.update", note),
                        { name },
                        { preserveScroll: true, preserveState: true },
                    );
                }
            }, 250);
        },
        [note.id],
    );

    const handleContentChange = useCallback(
        (content: string) => {
            if (!note.id) return;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                if (content) {
                    //
                }
            }, 250);
        },
        [note.id],
    );

    if (!note.id) return null;
    return (
        <div className="flex w-full flex-col">
            <div className="border-border mb-4 flex items-center justify-between border-b py-2">
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={noteName}
                    onChange={handleTitleChange}
                    className="mr-4 w-full bg-transparent text-2xl font-bold focus:outline-none"
                    placeholder="Note Title"
                />
                <span className="text-muted-foreground text-sm whitespace-nowrap">
                    {time.format.shortt(note.updated_at)}
                </span>
            </div>
            <MDXEditor
                key={note.id}
                markdown={note.content}
                onChange={handleContentChange}
                contentEditableClassName="w-full h-full text-lg outline-hidden prose dark:prose-invert text-foreground bg-background"
                plugins={[
                    headingsPlugin(),
                    quotePlugin(),
                    listsPlugin(),
                    thematicBreakPlugin(),
                    linkPlugin(),
                    tablePlugin(),
                    markdownShortcutPlugin(),
                ]}
            />
        </div>
    );
};

export { ShowContent };
