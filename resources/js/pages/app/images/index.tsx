import type { TTimelineView } from "@/types";
import type { TImage } from "@/types/models";

import { getQueryParam, replaceQueryParam } from "@/lib/url";
import { router } from "@inertiajs/react";

import { AppLayout } from "@/components/layouts/app-layout";
import { DeleteBatch } from "@/components/screens/images/delete-batch";
import { Timeline } from "@/components/screens/images/timeline";
import { ToggleView } from "@/components/screens/images/toggle-view";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Images = ({ images }: { images: TImage[] }) => {
    const href = window.location.href;

    const view = getQueryParam(href, "view", "grid") as TTimelineView;

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Images" />
            <div className="container mx-auto px-4 pt-8">
                <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Your Images from Notes & Todos</h1>
                        <ToggleView
                            view={view}
                            onChange={(value: TTimelineView) => {
                                router.get(replaceQueryParam(href, "view", value));
                            }}
                        />
                    </div>
                    {selectedImages.length > 0 && <DeleteBatch selectedImages={selectedImages} />}
                    <Timeline
                        images={images}
                        view={view}
                        selectedImages={selectedImages}
                        areaHeight={
                            selectedImages.length > 0
                                ? "calc(100vh - 14.5rem)"
                                : "calc(100vh - 9.05rem)"
                        }
                        onDeleteImage={(id: string) => {
                            router.delete(route("images.destroy", id));
                        }}
                        onCheckboxClick={(imageId: string) => {
                            setSelectedImages((prev) =>
                                prev.includes(imageId)
                                    ? prev.filter((id) => id !== imageId)
                                    : [...prev, imageId],
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Images;
