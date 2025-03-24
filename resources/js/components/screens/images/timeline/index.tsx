import type { TTimelineView } from "@/types";
import type { TImage } from "@/types/models";

import { groupImagesByDate } from "@/lib/images";
import { router } from "@inertiajs/react";

import { ScrollArea } from "@/components/ui/scroll-area";
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
}: {
    images: TImage[];
    view: TTimelineView;
    areaHeight: string;
}) => {
    const groupedImages = groupImagesByDate(images);

    const handleDeleteImage = (id: string, onSuccess: () => void) => {
        router.delete(route("images.destroy", id), {
            onSuccess,
        });
    };

    return (
        <ScrollArea style={{ height: areaHeight }}>
            {view === "grid" ? (
                <GridView groupedImages={groupedImages} onDeleteImage={handleDeleteImage} />
            ) : view === "list" ? (
                <ListView groupedImages={groupedImages} onDeleteImage={handleDeleteImage} />
            ) : (
                <></>
            )}
        </ScrollArea>
    );
};
