import type { TNote } from "@/types/models";
import type { ChangeEvent } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { plugins } from "@/lib/plugins";
import { time } from "@/lib/time";
import { toast } from "@/lib/toast";
import { error } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { useCallback, useEffect, useState } from "react";

import { MDXEditor } from "@mdxeditor/editor";
import { Delete } from "./delete";

export const Content = ({ note }: { note: TNote }) => {
    const { editorMode, updateNote } = useNotesStore();

    const [noteName, setNoteName] = useState(note.name);

    useEffect(() => {
        setNoteName(note.name);
    }, [note.id, note.name]);

    const debouncedUpdateName = useDebounce(async (name: string) => {
        if (note.id && name !== note.name) {
            const oldName = note.name;
            try {
                updateNote({ ...note, name });
                await window.axios.patch(route("notes.update", note), { name });
            } catch (e) {
                updateNote({ ...note, name: oldName });
                toast.error(error(e));
            }
        }
    }, 100);

    const debouncedUpdateContent = useDebounce(async (content: string) => {
        if (note.id && content !== note.content) {
            const oldContent = note.content;
            try {
                updateNote({ ...note, content });
                await window.axios.patch(route("notes.update", note), { content });
            } catch (e) {
                updateNote({ ...note, content: oldContent });
                toast.error(error(e));
            }
        }
    }, 250);

    const handleTitleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.target.value;
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
                    <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground text-sm whitespace-nowrap">
                            {time.format.shortt(note.updated_at)}
                        </span>
                        <Delete note={note} />
                    </div>
                </div>
            </div>
            <MDXEditor
                key={`${note.id}-${editorMode || ""}`}
                markdown={note.content}
                onChange={handleContentChange}
                contentEditableClassName="w-full p-0 max-w-full h-full min-h-(--notes-content-editor-height) text-base outline-hidden prose dark:prose-invert text-foreground bg-background"
                plugins={plugins(note, editorMode)}
            />
        </div>
    );
};
