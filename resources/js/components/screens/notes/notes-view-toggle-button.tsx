import { useNotesStore } from "@/states/notes";

import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { LayoutGridIcon, LayoutListIcon } from "lucide-react";

export const NotesViewToggleButton = ({ view }: { view: "index" | "show" }) => {
    const { notes } = useNotesStore();

    return (
        <Link
            href={
                view === "index"
                    ? route("notes.index")
                    : view === "show"
                      ? route("notes.show", notes[0])
                      : ""
            }
        >
            <Button size="icon" variant="outline" className="cursor-pointer" onClick={() => {}}>
                {view === "index" && <LayoutGridIcon className="h-4 w-4" />}
                {view === "show" && <LayoutListIcon className="h-4 w-4" />}
            </Button>
        </Link>
    );
};
