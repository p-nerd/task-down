import type { TNote } from "@/types/models";

import { cn } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";

import { AppLayout } from "@/components/layouts/app-layout";
import { Head } from "@inertiajs/react";

import { Content } from "./content";
import { Listing, Loading } from "./listing";
import { SidebarToggle } from "./sidebar-toggle";

import { Create } from "../create";
import { LoadMore } from "../load-more";
import { ViewToggle } from "../view-toggle";

export const Show = ({ note }: { note: TNote }) => {
    const { notes, sidebarVisible } = useNotesStore();

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title={`'${note.name}' Note`} />
            <div className="flex w-full justify-between pt-6">
                <div className="flex w-(--notes-sidebar-width) items-center justify-between pr-4">
                    <SidebarToggle />
                    {sidebarVisible && <Create />}
                </div>
                <ViewToggle view="index" />
            </div>
            <div className="flex h-full w-full py-2">
                {sidebarVisible && (
                    <div className="h-(--notes-content-height) w-(--notes-sidebar-width) space-y-4 overflow-y-auto transition-all duration-200">
                        {notes.length === 0 ? (
                            <div className="text-muted-foreground pt-4 text-center">
                                No Notes Yet!
                            </div>
                        ) : (
                            <>
                                <Listing />
                                <LoadMore loading={<Loading />} />
                            </>
                        )}
                    </div>
                )}
                <div
                    className={cn(
                        "h-(--notes-content-height) overflow-y-auto px-4 transition-all duration-200",
                        sidebarVisible ? "flex-1" : "w-full",
                    )}
                >
                    <Content note={note} />
                </div>
            </div>
        </AppLayout>
    );
};
