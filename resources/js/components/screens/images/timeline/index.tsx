import type { TImage } from "@/types/models";

import { groupImagesByDate } from "@/lib/images";
import { useImagesStore } from "@/states/images";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GridView, GridViewLoading } from "./grid-view";
import { ListView, ListViewLoading } from "./list-view";
import { PreviewImageModal } from "./preview-image-modal";

export const Loading = () => {
    const { viewMode } = useImagesStore();

    return <>{viewMode === "grid" ? <GridViewLoading /> : <ListViewLoading />}</>;
};

export const Timeline = ({ images, areaHeight }: { images: TImage[]; areaHeight: string }) => {
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
            </ScrollArea>
        </>
    );
};
