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
    onDeleteImage,
}: {
    images: TImage[];
    view: TTimelineView;
    onDeleteImage: (imageId: string) => void;
}) => {
    const groupedImages = groupImagesByDate(images);

    return (
        <ScrollArea className="h-(--images-height)">
            {view === "grid" ? (
                <GridView groupedImages={groupedImages} onDeleteImage={onDeleteImage} />
            ) : view === "list" ? (
                <ListView groupedImages={groupedImages} onDeleteImage={onDeleteImage} />
            ) : (
                <></>
            )}
        </ScrollArea>
    );
};
