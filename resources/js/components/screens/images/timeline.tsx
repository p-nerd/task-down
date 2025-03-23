import { format } from "date-fns";
import { getUserImages, groupImagesByDate } from "./data";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";

export const Timeline = () => {
    const images = getUserImages();
    const groupedImages = groupImagesByDate(images);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Your Images from Notes & Todos</h1>
                </div>

                <ScrollArea className="h-[calc(100vh-150px)]">
                    <div className="space-y-10 pr-4">
                        {groupedImages.map((group) => (
                            <div key={group.date} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="text-muted-foreground h-5 w-5" />
                                    <h2 className="text-xl font-semibold">{group.formattedDate}</h2>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {group.images.map((image) => (
                                        <div
                                            key={image.id}
                                            className="group bg-background relative overflow-hidden rounded-lg border shadow transition-all hover:shadow-lg"
                                        >
                                            <div className="relative aspect-square">
                                                <img
                                                    src={image.url || "/placeholder.svg"}
                                                    alt={image.title}
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium">{image.title}</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    {format(image.createdAt, "h:mm a")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};
