import type { TSharedData } from "@/types";

import { usePage } from "@inertiajs/react";

import { WhenVisible } from "@inertiajs/react";

export const LoadMoreNotes = () => {
    const { page, lastPage } = usePage<TSharedData<{ page: number; lastPage: number }>>().props;

    return (
        <>
            {page < lastPage && (
                <WhenVisible
                    always
                    params={{
                        preserveUrl: true,
                        data: { page: page + 1 },
                        only: ["notes", "page", "lastPage"],
                    }}
                    fallback={<div>Loading...</div>}
                >
                    <div>Loading 2...</div>
                </WhenVisible>
            )}
            {page >= lastPage && (
                <div className="text-muted-foreground py-5 text-center">No more notes to load.</div>
            )}
        </>
    );
};
