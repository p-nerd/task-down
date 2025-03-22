import type { TNote } from "@/types/models";
import type { ChangeEvent } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { plugins } from "@/lib/plugins";
import { time } from "@/lib/time";
import { router } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";

import { MDXEditor } from "@mdxeditor/editor";

const ShowContent = ({ note }: { note: TNote }) => {
    const [noteName, setNoteName] = useState(note.name);

    useEffect(() => {
        setNoteName(note.name);
    }, [note.id, note.name]);

    const debouncedUpdateName = useDebounce((name: string) => {
        if (note.id && name) {
            router.patch(
                route("notes.update", note),
                { name },
                { preserveScroll: true, preserveState: true },
            );
        }
    }, 250);

    const debouncedUpdateContent = useDebounce((content: string) => {
        if (note.id && content) {
            router.patch(
                route("notes.update", note),
                { content },
                { preserveScroll: true, preserveState: true },
            );
        }
    }, 250);

    const handleTitleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.target.value;
            console.log(name, name.length);
            setNoteName(name);
            debouncedUpdateName(name);
        },
        [debouncedUpdateName],
    );

    const handleContentChange = useCallback(
        (content: string) => {
            debouncedUpdateContent(content);
        },
        [debouncedUpdateContent],
    );

    if (!note.id) return null;

    return (
        <div className="flex h-full w-full flex-col">
            <div className="w-full px-[0.75rem]">
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
            </div>
            <MDXEditor
                key={note.id}
                markdown={note.content}
                onChange={handleContentChange}
                contentEditableClassName="w-full p-0 max-w-full h-full min-h-(--notes-content-editor-height) text-base outline-hidden prose dark:prose-invert text-foreground bg-background"
                plugins={plugins(note)}
            />
        </div>
    );
};

export { ShowContent };
