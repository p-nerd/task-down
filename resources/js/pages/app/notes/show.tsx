import type { TNote } from "@/types/models";

import { cn } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { useEffect } from "react";

import { AppLayout } from "@/components/layouts/app-layout";
import { CreateNoteButton } from "@/components/screens/notes/create-note-button";
import { NotesViewToggleButton } from "@/components/screens/notes/notes-view-toggle-button";
import { ShowContent } from "@/components/screens/notes/show-content";
import { ShowListing } from "@/components/screens/notes/show-listing";
import { SidebarToggleButton } from "@/components/screens/notes/sidebar-toggle-button";
import { Head } from "@inertiajs/react";

const Note = ({ note, ...props }: { note: TNote; notes: TNote[] }) => {
    const { notes, setNotes, sidebarVisible } = useNotesStore();

    useEffect(() => setNotes(props.notes), [props.notes]);

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title={`'${note.name}' Note`} />
            <div className="flex w-full justify-between pt-6">
                <div className="flex w-[300px] items-center justify-between">
                    <SidebarToggleButton />
                    {sidebarVisible && <CreateNoteButton />}
                </div>
                <NotesViewToggleButton view="index" />
            </div>
            <div className="flex h-full w-full py-2">
                {sidebarVisible && (
                    <div className="h-(--notes-content-height) w-[300px] space-y-4 overflow-y-auto transition-all duration-200">
                        {notes.length === 0 ? (
                            <div className="text-muted-foreground pt-4 text-center">
                                No Notes Yet!
                            </div>
                        ) : (
                            <ShowListing notes={notes} note={note} />
                        )}
                    </div>
                )}
                <div
                    className={cn(
                        "h-(--notes-content-height) overflow-y-auto px-4 transition-all duration-200",
                        sidebarVisible ? "flex-1" : "w-full",
                    )}
                >
                    <ShowContent note={note} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Note;
