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
import { useUpdateNoteContent } from "~/queries/notes";
import { useNote } from "~/states/notes";

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

const Editor = ({ id, content }: { id?: string; content: string }) => {
    const timeoutRef = useRef<any>(null);

    const { mutate } = useUpdateNoteContent();

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
                    mutate({ id, content });
                }
            }, 500); // Debounce for 500ms
        },
        [id, mutate],
    );

    if (!id) return null;

    return (
        <MDXEditor
            key={id}
            markdown={content}
            onChange={handleContentChange}
            contentEditableClassName="min-h-screen max-w-none px-8 py-5 text-lg outline-hidden prose dark:prose-invert text-foreground bg-background"
            plugins={plugins}
        />
    );
};

export const Content = () => {
    const note = useNote();

    return (
        <main className="bg-background flex-1 overflow-auto">
            <Editor id={note?.id} content={note?.content || ""} />
        </main>
    );
};
