import { useNotesStore } from "@/states/notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { NotesViewToggleButton } from "@/components/screens/notes/notes-view-toggle-button";
import { Head } from "@inertiajs/react";

import { LoadMoreNotes } from "../load-more-notes";
import { Listing, ListingLoading } from "./listing";

import { Create } from "../create";

export const Index = () => {
    const { notes } = useNotesStore();

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Notes" />
            <div className="flex justify-between pt-6">
                <Create />
                {notes.length !== 0 && <NotesViewToggleButton view="show" />}
            </div>
            <div className="flex h-full w-full py-2">
                <div className="h-(--notes-content-height) w-full overflow-y-auto">
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <>
                            <Listing />
                            <LoadMoreNotes loading={<ListingLoading />} />
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
