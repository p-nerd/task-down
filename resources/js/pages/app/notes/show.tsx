import type { TNote } from "@/types/models";

import { useNotes } from "@/hooks/use-notes";
import { useState } from "react";

import { AppLayout } from "@/components/layouts/app-layout";
import { CreateNote } from "@/components/screens/notes/create-note";
import { ShowContent } from "@/components/screens/notes/show-content";
import { ShowListing } from "@/components/screens/notes/show-listing";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { LayoutGridIcon, PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";

const Note = (props: { note: TNote; notes: TNote[] }) => {
    const { notes, handleCreateNote, handleDeleteNote } = useNotes(props.notes);
    const note = props.note;
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title={`'${note.name}' Note`} />
            <div className="flex w-full justify-between pt-6">
                <div className="flex w-[300px] items-center justify-between">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={toggleSidebar}
                        className="mr-2 cursor-pointer"
                        title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
                    >
                        {sidebarVisible ? (
                            <PanelLeftCloseIcon className="h-4 w-4" />
                        ) : (
                            <PanelLeftIcon className="h-4 w-4" />
                        )}
                    </Button>
                    {sidebarVisible && <CreateNote onClick={() => handleCreateNote()} />}
                </div>
                <Link href={route("notes.index")}>
                    <Button size="icon" variant="outline" className="cursor-pointer">
                        <LayoutGridIcon className="h-4 w-4" />
                    </Button>
                </Link>
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
                    className={`h-(--notes-content-height) ${sidebarVisible ? "flex-1" : "w-full"} overflow-y-auto px-4 transition-all duration-200`}
                >
                    <ShowContent note={note} handleDeleteNote={handleDeleteNote} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Note;
