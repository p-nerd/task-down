import type { TTimelineView } from "@/types";

import { groupImagesByDate } from "@/lib/images";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TImage } from "@/types/models";
import { GridView, GridViewLoading } from "./grid-view";
import { ListView, ListViewLoading } from "./list-view";

export const Loading = ({ view: view }: { view: TTimelineView }) => {
    return (
        <>{view === "grid" ? <GridViewLoading /> : view === "list" ? <ListViewLoading /> : <></>}</>
    );
};

export const Timeline = ({
    images,
    view,
    areaHeight,
    selectedImages,
    onDeleteImage,
    onCheckboxClick,
}: {
    images: TImage[];
    view: TTimelineView;
    areaHeight: string;
    selectedImages: string[];
    onDeleteImage: (imageId: string, onSuccess: () => void) => void;
    onCheckboxClick: (imageId: string) => void;
}) => {
    const groupedImages = groupImagesByDate(images);

    return (
        <ScrollArea style={{ height: areaHeight }}>
            {view === "grid" ? (
                <GridView groupedImages={groupedImages} onDeleteImage={onDeleteImage} />
            ) : view === "list" ? (
                <ListView
                    groupedImages={groupedImages}
                    onDeleteImage={onDeleteImage}
                    selectedImages={selectedImages}
                    onCheckboxClick={onCheckboxClick}
                />
            ) : (
                <></>
            )}
        </ScrollArea>
    );
};
