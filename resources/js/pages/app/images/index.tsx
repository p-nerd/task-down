import type { TImage } from "@/types/models";
import type { TTimelineViewMode } from "@/types/utils";

import { getQueryParams } from "@/lib/utils";

import { AppLayout } from "@/components/layouts/app-layout";
import { Loading, Timeline } from "@/components/screens/images/timeline";
import { Deferred, Head } from "@inertiajs/react";

const Images = ({ images }: { images: TImage[] }) => {
    const quries = getQueryParams(window.location.href);

    const viewMode: TTimelineViewMode = (quries?.view as TTimelineViewMode) || "grid";

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Images" />
            <div className="container mx-auto px-4 pt-8">
                <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Your Images from Notes & Todos</h1>
                    </div>
                    <Deferred data={["images"]} fallback={<Loading viewMode={viewMode} />}>
                        <Timeline images={images} viewMode={viewMode} />
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
};

export default Images;
