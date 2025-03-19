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

import { MDXEditor } from "@mdxeditor/editor";

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

const ShowContent = ({ note }: { note: TNote }) => {
    const timeoutRef = useRef<any>(null);

    const handleContentChange = useCallback(
        (content: string) => {
            if (!note.id) return;

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a new timeout for debouncing
            timeoutRef.current = setTimeout(() => {
                if (content) {
                    //
                }
            }, 500); // Debounce for 500ms
        },
        [note.id],
    );

    if (!note.id) return null;

    return (
        <MDXEditor
            key={note.id}
            markdown={note.content}
            onChange={handleContentChange}
            contentEditableClassName="w-full h-full text-lg outline-hidden prose dark:prose-invert text-foreground bg-background"
            plugins={plugins}
        />
    );
};

export { ShowContent };
