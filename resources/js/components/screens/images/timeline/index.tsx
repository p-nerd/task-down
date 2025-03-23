import type { TTimelineViewMode } from "@/types/utils";

import { groupImagesByDate } from "@/lib/images";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TImage } from "@/types/models";
import { GridView, GridViewLoading } from "./grid-view";
import { RowView, RowViewLoading } from "./row-view";

export const Loading = ({ viewMode }: { viewMode: TTimelineViewMode }) => {
    return (
        <>
            {viewMode === "grid" ? (
                <GridViewLoading />
            ) : viewMode === "row" ? (
                <RowViewLoading />
            ) : (
                <></>
            )}
        </>
    );
};

export const Timeline = ({
    images,
    viewMode,
}: {
    images: TImage[];
    viewMode: TTimelineViewMode;
}) => {
    const groupedImages = groupImagesByDate(images);

    return (
        <ScrollArea className="h-(--images-height)">
            {viewMode === "grid" ? (
                <GridView groupedImages={groupedImages} />
            ) : viewMode === "row" ? (
                <RowView groupedImages={groupedImages} />
            ) : (
                <></>
            )}
        </ScrollArea>
    );
};
