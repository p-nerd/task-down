import { useNotesStore } from "@/states/notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "lucide-react";

import { Listing, Loading } from "./listing";
import { LoadMore } from "./load-more";

export const Notes = () => {
    const { archiveNotes } = useNotesStore();

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title={`(${archiveNotes.length}) Archived Notes`} />
            <div className="flex justify-between pt-6">
                <Link href="/notes">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Notes
                    </Button>
                </Link>
            </div>
            <div className="flex h-full w-full py-2">
                <div className="h-(--notes-content-height) w-full overflow-y-auto">
                    {archiveNotes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">
                            No Archived Notes!
                        </div>
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
