import type { TImage } from "@/types/models";

import { groupImagesByDate } from "@/lib/images";
import { useImagesStore } from "@/states/images";

import { ScrollArea } from "@/components/ui/scroll-area";
import { WhenVisible } from "@inertiajs/react";
import { GridView, GridViewLoading } from "./grid-view";
import { ListView, ListViewLoading } from "./list-view";
import { PreviewImageModal } from "./preview-image-modal";

export const Loading = () => {
    const { viewMode } = useImagesStore();

    return <>{viewMode === "grid" ? <GridViewLoading /> : <ListViewLoading />}</>;
};

export const Timeline = ({
    images,
    page,
    lastPage,
    areaHeight,
}: {
    images: TImage[];
    page: number;
    lastPage: number;
    areaHeight: string;
}) => {
    const groupedImages = groupImagesByDate(images);

    const { viewMode } = useImagesStore();

    return (
        <>
            <PreviewImageModal />
            <ScrollArea style={{ height: areaHeight }}>
                {viewMode === "grid" ? (
                    <GridView groupedImages={groupedImages} />
                ) : (
                    <ListView groupedImages={groupedImages} />
                )}
                {page < lastPage && (
                    <WhenVisible
                        always
                        params={{
                            preserveUrl: true,
                            data: { page: page + 1 },
                            only: ["images", "page", "last_page"],
                        }}
                        fallback={<p className="text-center text-gray-500">End more...</p>}
                    >
                        <p className="text-center text-gray-500">Loading more...</p>
                    </WhenVisible>
                )}
                {page >= lastPage && (
                    <p className="text-center text-gray-500">No more articles to load.</p>
                )}
            </ScrollArea>
        </>
    );
};
