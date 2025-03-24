import type { TTimelineView } from "@/types";
import type { TImage } from "@/types/models";

import { getQueryParam, replaceQueryParam } from "@/lib/url";
import { router } from "@inertiajs/react";

import { AppLayout } from "@/components/layouts/app-layout";
import { Timeline } from "@/components/screens/images/timeline";
import { ToggleView } from "@/components/screens/images/toggle-view";
import { Head } from "@inertiajs/react";

const Images = ({ images }: { images: TImage[] }) => {
    const href = window.location.href;

    const view = getQueryParam(href, "view", "grid") as TTimelineView;

    const handleToogleView = (value: TTimelineView) => {
        router.get(replaceQueryParam(href, "view", value));
    };

    const handleDeleteImage = (id: string) => {
        router.delete(route("images.destroy", id));
    };

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Images" />
            <div className="container mx-auto px-4 pt-8">
                <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Your Images from Notes & Todos</h1>
                        <ToggleView view={view} onChange={handleToogleView} />
                    </div>
                    <Timeline images={images} view={view} onDeleteImage={handleDeleteImage} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Images;
