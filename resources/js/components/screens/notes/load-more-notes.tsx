import type { TSharedData } from "@/types";
import type { ReactNode } from "react";

import { useNotesStore } from "@/states/notes";
import { usePage } from "@inertiajs/react";

import { WhenVisible } from "@inertiajs/react";

export const LoadMoreNotes = ({ loading }: { loading: ReactNode }) => {
    const { page, lastPage } = usePage<TSharedData<{ page: number; lastPage: number }>>().props;
    const { note } = useNotesStore();

    return (
        <>
            {page < lastPage && (
                <WhenVisible
                    always
                    params={{
                        preserveUrl: true,
                        data: { page: page + 1, noteId: note?.id },
                        only: ["notes", "page", "lastPage"],
                    }}
                    fallback={<>{loading}</>}
                >
                    <>{loading}</>
                </WhenVisible>
            )}
            {page >= lastPage && (
                <div className="text-muted-foreground py-5 text-center">No more notes to load.</div>
            )}
        </>
    );
};
