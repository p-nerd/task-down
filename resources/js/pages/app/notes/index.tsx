import type { TNote } from "@/types/models";

import { useNotes } from "@/hooks/use-notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { CreateNote } from "@/components/screens/notes/create-note";
import { IndexListing } from "@/components/screens/notes/index-listing";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { LayoutListIcon } from "lucide-react";

const Notes = (props: { notes: TNote[] }) => {
    const { notes, handleCreateNote } = useNotes(props.notes);

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Notes" />
            <div className="flex justify-between pt-6">
                <CreateNote onClick={handleCreateNote} />
                {notes.length !== 0 && (
                    <Link href={route("notes.show", notes[0])}>
                        <Button
                            size="icon"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => {}}
                        >
                            <LayoutListIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                )}
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

export default Notes;
