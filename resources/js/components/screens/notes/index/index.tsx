import { useNotesStore } from "@/states/notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { Head } from "@inertiajs/react";

import { Listing, Loading } from "./listing";

import { Create } from "../create";
import { LoadMore } from "../load-more";
import { ViewToggle } from "../view-toggle";

export const Index = () => {
    const { notes } = useNotesStore();

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Notes" />
            <div className="flex justify-between pt-6">
                <Create />
                {notes.length !== 0 && <ViewToggle view="show" />}
            </div>
            <div className="flex h-full w-full py-2">
                <div className="h-(--notes-content-height) w-full overflow-y-auto">
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <>
                            <Listing />
                            <LoadMore loading={<Loading />} />
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
