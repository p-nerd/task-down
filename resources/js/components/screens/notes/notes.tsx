import { useNotesStore } from "@/states/notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { CreateNoteButton } from "@/components/screens/notes/create-note-button";
import { IndexListing } from "@/components/screens/notes/index-listing";
import { NotesViewToggleButton } from "@/components/screens/notes/notes-view-toggle-button";
import { Head } from "@inertiajs/react";

export const Notes = () => {
    const { notes } = useNotesStore();

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Notes" />
            <div className="flex justify-between pt-6">
                <CreateNoteButton />
                {notes.length !== 0 && <NotesViewToggleButton view="show" />}
            </div>
            <div className="flex h-full w-full py-2">
                <div className="h-(--notes-content-height) w-full overflow-y-auto">
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <IndexListing notes={notes} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
