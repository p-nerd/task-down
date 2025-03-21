import type { TNote } from "@/types/models";

import { AppLayout } from "@/components/layouts/app-layout";
import { CreateNote } from "@/components/screens/notes/create-note";
import { DeleteNote } from "@/components/screens/notes/delete-note";
import { ShowContent } from "@/components/screens/notes/show-content";
import { ShowListing } from "@/components/screens/notes/show-listing";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { LayoutGridIcon } from "lucide-react";

const Note = ({ note, notes }: { note: TNote; notes: TNote[] }) => {
    const contentHeight = "calc(100vh - 130px)";

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title={`'${note.name}' Note`} />
            <div className="flex w-full justify-between pt-6">
                <div className="flex w-[300px] justify-between">
                    <CreateNote />
                    <DeleteNote noteId={note.id} />
                </div>
                <Link href={route("notes.index")}>
                    <Button size="icon" variant="outline" className="cursor-pointer">
                        <LayoutGridIcon className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="flex h-full w-full py-2">
                <div
                    className="w-[300px] space-y-4 overflow-y-auto"
                    style={{ height: contentHeight }}
                >
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <ShowListing notes={notes} note={note} />
                    )}
                </div>
                <div className="flex-1 overflow-y-auto px-4" style={{ height: contentHeight }}>
                    <ShowContent note={note} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Note;
