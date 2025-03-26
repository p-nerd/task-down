import type { TImagesTimelineView } from "@/types";
import type { TImage } from "@/types/models";

import { groupImagesByDate } from "@/lib/images";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GridView, GridViewLoading } from "./grid-view";
import { ListView, ListViewLoading } from "./list-view";
import { PreviewImageModal } from "./preview-image-modal";

export const Loading = ({ view: view }: { view: TImagesTimelineView }) => {
    return (
        <>{view === "grid" ? <GridViewLoading /> : view === "list" ? <ListViewLoading /> : <></>}</>
    );
};

export const Timeline = ({
    images,
    view,
    areaHeight,
}: {
    images: TImage[];
    view: TImagesTimelineView;
    areaHeight: string;
}) => {
    const groupedImages = groupImagesByDate(images);

    return (
        <>
            <PreviewImageModal />
            <ScrollArea style={{ height: areaHeight }}>
                {view === "grid" ? (
                    <GridView groupedImages={groupedImages} />
                ) : view === "list" ? (
                    <ListView groupedImages={groupedImages} />
                ) : (
                    <></>
                )}
            </ScrollArea>
        </>
    );
};
