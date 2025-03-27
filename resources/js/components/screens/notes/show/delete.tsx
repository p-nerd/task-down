import type { TNote } from "@/types/models";

import { collect } from "@/lib/collect";
import { toast } from "@/lib/toast";
import { error } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";

import { Confirmation } from "@/components/elements/confirmation";
import { Trash2Icon } from "lucide-react";

export const Delete = ({ note }: { note: TNote }) => {
    const { notes, setNotes, setNote } = useNotesStore();

    const handleDelete = async () => {
        let orNotes = [...notes];

        try {
            const nextNote =
                collect(notes).after(note, (a, b) => a.id === b.id) ||
                collect(notes).before(note, (a, b) => a.id === b.id);

            setNote(nextNote);
            setNotes(orNotes.filter((n) => n.id !== note.id));

            await window.axios.delete(route("notes.destroy", note));
        } catch (e) {
            setNote(note);
            setNotes(orNotes);
            toast.error(error(e));
        }
    };

    return (
        <>
            <Confirmation actionText="Delete" onAction={handleDelete}>
                <button className="group cursor-pointer">
                    <Trash2Icon className="h-4.5 w-4.5 transition-colors group-hover:text-red-500" />
                </button>
            </Confirmation>
        </>
    );
};
