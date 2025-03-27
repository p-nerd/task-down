import { error } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { TNote } from "@/types/models";
import { NotebookPenIcon } from "lucide-react";

export const Create = () => {
    const { notes, setNotes, setNote } = useNotesStore();

    const handleCreate = async () => {
        try {
            const response = await window.axios.post<TNote>(route("notes.store"));
            setNote(response.data);
            setNotes([response.data, ...notes]);
        } catch (e) {
            toast.error(error(e));
        }
    };

    return (
        <Button size="icon" variant="outline" className="cursor-pointer" onClick={handleCreate}>
            <NotebookPenIcon className="h-4 w-4 transition-colors" />
        </Button>
    );
};
