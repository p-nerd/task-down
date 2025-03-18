import type { TNote } from "@/types/models";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useNotes } from "@/states/notes";
import { useEffect, useRef, useState } from "react";

const useUpdateNoteName = (note: TNote) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(note.name);

    // const { mutate, isPending } = useMutation<
    //     TNote,
    //     TError<{ message?: string }>,
    //     { id: string; name: string },
    //     { previousName: string }
    // >({
    //     mutationFn: ({ id, name }) => updateNote({ id, name }),
    //     onMutate: async ({ id, name }) => {
    //         await queryClient.cancelQueries({ queryKey: ["notes"] });
    //
    //         const previousName = note.name;
    //
    //         queryClient.setQueryData<TNote[]>(["notes"], (oldNotes) => {
    //             return oldNotes?.map((n) => (n.id === id ? { ...n, name } : n));
    //         });
    //
    //         return { previousName };
    //     },
    //     onError: (e, __, context) => {
    //         if (context) {
    //             queryClient.setQueryData<TNote[]>(["notes"], (oldNotes = []) => {
    //                 return oldNotes.map((n) =>
    //                     n.id === note.id ? { ...n, name: context.previousName } : n,
    //                 );
    //             });
    //             setEditedName(context.previousName);
    //         }
    //         toast.error(e?.response?.data?.message || "Error updating note name");
    //     },
    //     onSuccess: () => {
    //         setIsEditing(false);
    //     },
    // });
    const mutate = (props: { id: string; name: string }) => {};

    const isPending = false;

    return {
        mutate,
        isPending,
        isEditing,
        setIsEditing,
        editedName,
        setEditedName,
    };
};

export const NoteItem = ({ note }: { note: TNote }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { activeNoteId, setActiveNoteId, viewMode, setViewMode } = useNotes();

    const { mutate, isPending, isEditing, setIsEditing, editedName, setEditedName } =
        useUpdateNoteName(note);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
            adjustTextareaHeight();
        }
    }, [isEditing]);

    const adjustTextareaHeight = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = inputRef.current.scrollHeight + "px";
        }
    };

    const handleNameSubmit = () => {
        if (editedName.trim() === "") {
            setEditedName(note.name);
            setIsEditing(false);
            return;
        }

        if (editedName !== note.name) {
            mutate({ id: note.id, name: editedName.trim() });
        } else {
            setIsEditing(false);
        }
    };

    return (
        <div
            onClick={() => {
                if (!isEditing) {
                    if (viewMode === "grid") setViewMode("list");
                    setActiveNoteId(note.id);
                }
            }}
            className={cn(
                "cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                {
                    "bg-primary text-primary-foreground": activeNoteId === note.id,
                },
            )}
        >
            <h3 className="mb-1">
                {!isEditing ? (
                    <div
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true);
                        }}
                        className={cn("w-full font-bold", {
                            "line-clamp-2 break-words": viewMode === "list",
                        })}
                    >
                        {note.name}
                    </div>
                ) : (
                    <textarea
                        ref={inputRef}
                        value={editedName}
                        onChange={(e) => {
                            setEditedName(e.target.value);
                            adjustTextareaHeight();
                        }}
                        onBlur={handleNameSubmit}
                        onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleNameSubmit();
                            } else if (e.key === "Escape") {
                                setEditedName(note.name);
                                setIsEditing(false);
                            }
                        }}
                        disabled={isPending}
                        className={cn(
                            "w-full resize-none bg-transparent font-bold outline-hidden",
                            {
                                "opacity-50": isPending,
                            },
                        )}
                    />
                )}
            </h3>
            <span className="text-xs font-light">{time.format.shortt(note.created_at)}</span>
        </div>
    );
};
