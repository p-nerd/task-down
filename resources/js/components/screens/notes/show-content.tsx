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

const ShowContent = ({ note }: { note: TNote }) => {
    const timeoutRef = useRef<any>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const handleTitleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!note.id) return;
            const newTitle = event.target.value;

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a new timeout for debouncing title updates
            timeoutRef.current = setTimeout(() => {
                if (newTitle) {
                    // Update title logic would go here
                    console.log("Title updated:", newTitle);
                }
            }, 500); // Debounce for 500ms
        },
        [note.id],
    );

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
        <div className="flex w-full flex-col">
            <div className="border-border mb-4 border-b">
                <input
                    ref={titleInputRef}
                    type="text"
                    defaultValue={note.name}
                    onChange={handleTitleChange}
                    className="w-full bg-transparent text-2xl font-bold focus:outline-none"
                    placeholder="Note Title"
                />
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
