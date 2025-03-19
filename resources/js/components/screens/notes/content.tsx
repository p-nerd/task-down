import type { TNote } from "@/types/models";

import {
    headingsPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
} from "@mdxeditor/editor";

import { useCallback, useRef } from "react";

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

export const Content = ({
    note,
    onUpdate,
}: {
    note: TNote;
    onUpdate: (content: string) => void;
}) => {
    return <Editor id={note?.id} content={note?.content || ""} onUpdate={onUpdate} />;
};
