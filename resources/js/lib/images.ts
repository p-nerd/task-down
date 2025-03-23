import type { TImage } from "@/types/models";

import { format } from "date-fns";

export type TGroupImage = {
    date: string;
    formattedDate: string;
    images: TImage[];
};

export const groupImagesByDate = (images: TImage[]): TGroupImage[] => {
    const grouped = images.reduce(
        (acc, image) => {
            const dateKey = format(image.created_at, "yyyy-MM-dd");
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(image);
            return acc;
        },
        {} as Record<string, typeof images>,
    );

    return Object.entries(grouped)
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([date, images]) => ({
            date,
            formattedDate: format(new Date(date), "MMMM d, yyyy"),
            images,
        }));
};
