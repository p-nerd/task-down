import { useNotesStore } from "@/states/notes";

import { Button } from "@/components/ui/button";
import { LayoutGridIcon, LayoutListIcon } from "lucide-react";

export const NotesViewToggleButton = ({ view }: { view: "index" | "show" }) => {
    const { notes, setNote } = useNotesStore();

    return (
        <Button
            size="icon"
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
                if (view === "index") {
                    setNote(null);
                } else if (view === "show") {
                    setNote(notes[0]);
                }
            }}
        >
            {view === "index" && <LayoutGridIcon className="h-4 w-4" />}
            {view === "show" && <LayoutListIcon className="h-4 w-4" />}
        </Button>
    );
};
