import { format } from "date-fns";

export const getUserImages = () => {
    return [
        {
            id: "1",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-12-15T10:30:00"),
            title: "Winter landscape",
        },
        {
            id: "2",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-12-15T14:20:00"),
            title: "Family gathering",
        },
        {
            id: "3",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-12-10T09:15:00"),
            title: "Morning coffee",
        },
        {
            id: "4",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-11-28T16:45:00"),
            title: "City skyline",
        },
        {
            id: "5",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-11-28T18:30:00"),
            title: "Sunset at the beach",
        },
        {
            id: "6",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-11-20T12:10:00"),
            title: "Birthday celebration",
        },
        {
            id: "7",
            url: "/placeholder.svg?height=300&width=400",
            createdAt: new Date("2023-10-15T08:20:00"),
            title: "Autumn leaves",
        },
    ];
};

export const groupImagesByDate = (images: Awaited<ReturnType<typeof getUserImages>>) => {
    const grouped = images.reduce(
        (acc, image) => {
            const dateKey = format(image.createdAt, "yyyy-MM-dd");
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
