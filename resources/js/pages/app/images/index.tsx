import type { TImage } from "@/types/models";

import { groupImagesByDate } from "@/lib/images";
import { useImagesStore } from "@/states/images";

import { AppLayout } from "@/components/layouts/app-layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Head, WhenVisible } from "@inertiajs/react";

import { DeleteBatch } from "@/components/screens/images/delete-batch";
import { GridView, GridViewLoading } from "@/components/screens/images/grid-view";
import { ListView, ListViewLoading } from "@/components/screens/images/list-view";
import { PreviewImageModal } from "@/components/screens/images/preview-image-modal";
import { ToggleView } from "@/components/screens/images/toggle-view";

const Images = ({
    images,
    page,
    last_page,
}: {
    images: TImage[];
    page: number;
    last_page: number;
}) => {
    const { selectedImageIds, viewMode } = useImagesStore();

    const groupedImages = groupImagesByDate(images);

    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Images" />
            <div className="container mx-auto px-4 pt-8">
                <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">
                            Your ({images.length}) Images from Notes & Todos
                        </h1>
                        <ToggleView />
                    </div>
                    {selectedImageIds.length > 0 && <DeleteBatch />}
                    <PreviewImageModal />
                    <ScrollArea
                        style={{
                            height:
                                selectedImageIds.length > 0
                                    ? "calc(100vh - 14.5rem)"
                                    : "calc(100vh - 9.05rem)",
                        }}
                    >
                        {viewMode === "grid" ? (
                            <GridView groupedImages={groupedImages} />
                        ) : (
                            <ListView groupedImages={groupedImages} />
                        )}
                        {page < last_page && (
                            <WhenVisible
                                always
                                params={{
                                    preserveUrl: true,
                                    data: { page: page + 1 },
                                    only: ["images", "page", "last_page"],
                                }}
                                fallback={
                                    viewMode === "grid" ? <GridViewLoading /> : <ListViewLoading />
                                }
                            >
                                {viewMode === "grid" ? <GridViewLoading /> : <ListViewLoading />}
                            </WhenVisible>
                        )}
                        {page >= last_page && (
                            <p className="text-muted-foreground py-5 text-center">
                                No more images to load.
                            </p>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </AppLayout>
    );
};

export default Images;
