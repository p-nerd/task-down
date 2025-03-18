import type { TNote } from "@/types/models";

import { cn } from "@/lib/utils";
import { useNotes } from "@/states/notes";
import { useState } from "react";

import { NoteItem } from "./note-item";

const useUpdateNoteOrder = () => {
    // const { mutate, isPending } = useMutation<
    //     void,
    //     TError<{ message?: string }>,
    //     { id: string; order: number }[]
    // >({
    //     mutationFn: (notes) => axios.patch("/api/notes/reorder", { notes }),
    //     onError: (e) => toast.error(e?.response?.data?.message || "Error reordering notes"),
    // });
    //
    // return {
    //     mutate,
    //     isPending,
    // };
    return {
        mutate: (notes: { id: string; order: number }[]) => {},
        isPending: false,
    };
};

export const NotesListing = ({
    notes,
    setNotes,
}: {
    notes: TNote[];
    setNotes: (notes: TNote[]) => void;
}) => {
    const { viewMode } = useNotes();

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const { mutate, isPending } = useUpdateNoteOrder();

    return (
        <>
            {notes.length === 0 ? (
                <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
            ) : (
                <ul
                    className={cn("space-y-1", {
                        "ml-10 grid grid-cols-4 gap-3 space-y-0": viewMode === "grid",
                    })}
                >
                    {notes.map((note, index) => (
                        <li
                            key={note.id}
                            draggable={!isPending}
                            onDragStart={(e) => {
                                setDraggedIndex(index);
                                e.dataTransfer.effectAllowed = "move";
                            }}
                            onDragEnd={() => {
                                if (draggedIndex !== null) {
                                    mutate(
                                        notes.map((note, index) => ({
                                            id: note.id,
                                            order: index,
                                        })),
                                    );
                                }
                                setDraggedIndex(null);
                            }}
                            onDragEnter={(e) => {
                                e.preventDefault();
                                if (draggedIndex !== null && index !== draggedIndex) {
                                    const newNotes = [...notes];
                                    const [draggedNote] = newNotes.splice(draggedIndex, 1);
                                    newNotes.splice(index, 0, draggedNote);
                                    setNotes(newNotes);
                                    setDraggedIndex(index);
                                }
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className={cn(
                                "transition-opacity",
                                draggedIndex === index && "opacity-50",
                            )}
                        >
                            <NoteItem note={note} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
