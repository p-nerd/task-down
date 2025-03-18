import type { TNote } from "@/types/models";

import { cn } from "@/lib/utils";
import { useNotes } from "@/states/notes";

import { Content } from "@/components/screens/notes/content";
import { CreateNote } from "@/components/screens/notes/create-note";
import { DeleteNote } from "@/components/screens/notes/delete-note";
import { NotesListing } from "@/components/screens/notes/notes-listing";
import { ViewModeToggle } from "@/components/screens/notes/view-mode-toggle";

const Notes = ({ notes }: { notes: TNote[] }) => {
    const { viewMode } = useNotes();

    return (
        <div className="flex h-full w-full flex-row">
            <aside
                className={cn("bg-card h-[100vh+10px] w-full space-y-4 overflow-auto py-2", {
                    "w-[262px] pr-3": viewMode === "list",
                })}
            >
                <div className="flex justify-between">
                    <CreateNote />
                    {viewMode === "list" && <DeleteNote />}
                </div>
                <NotesListing notes={notes} setNotes={() => {}} />
            </aside>
            {viewMode === "list" && <Content note={notes[0]} onUpdate={() => {}} />}
            <div className="py-2">
                <ViewModeToggle />
            </div>
        </div>
    );
};

export default Notes;
