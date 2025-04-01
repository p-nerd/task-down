import { useNotesStore } from "@/states/notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { Head } from "@inertiajs/react";

import { Listing, Loading } from "./listing";
import { SelectionToolbar } from "./selection-toolbar";

import { Create } from "../create";
import { LoadMore } from "../load-more";
import { ViewToggle } from "../view-toggle";

export const Index = () => {
    const { notes, selectedNoteIds } = useNotesStore();

    const pinnedNotes = notes.filter((note) => note.pin_at);
    const othersNotes = notes.filter((note) => !note.pin_at);

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title={`(${notes.length}) Notes`} />
            <div className="flex justify-between pt-6">
                <Create />
                {notes.length !== 0 && <ViewToggle view="show" />}
            </div>
            <div className="flex h-full w-full py-2">
                <div className="h-(--notes-content-height) w-full overflow-y-auto">
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <div>
                            <div className="mb-16">
                                {pinnedNotes.length > 0 && (
                                    <h3 className="px-14 font-bold">PINNED</h3>
                                )}
                                <Listing notes={pinnedNotes} />
                            </div>
                            <div>
                                {pinnedNotes.length > 0 && (
                                    <h3 className="px-14 font-bold">OTHERS</h3>
                                )}
                                <Listing notes={othersNotes} />
                                <LoadMore loading={<Loading />} />
                                {selectedNoteIds.length > 0 && <SelectionToolbar />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
