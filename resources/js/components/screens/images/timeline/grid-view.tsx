import type { TGroupImage } from "@/lib/images";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon } from "lucide-react";
import { DeleteImage } from "./delete-image";

export const GridViewLoading = () => {
    return (
        <div className="space-y-10">
            {[1, 2].map((group) => (
                <div key={group} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-px w-full" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-background overflow-hidden rounded-lg border"
                            >
                                <Skeleton className="aspect-square w-full" />
                                <div className="space-y-2 p-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const GridView = ({
    groupedImages,
    onDeleteImage,
    selectedImages,
    onCheckboxClick,
}: {
    groupedImages: TGroupImage[];
    onDeleteImage: (imageId: string, onSuccess: () => void) => void;
    selectedImages: string[];
    onCheckboxClick: (imageIds: string[]) => void;
}) => {
    return (
        <div className="space-y-10 pr-4">
            {groupedImages.map((group) => (
                <div key={group.date} className="space-y-4">
                    <div className="group flex items-center gap-2">
                        <Checkbox
                            id={`select-${group.date}`}
                            checked={false}
                            onCheckedChange={() => {}}
                            className={cn(
                                "hidden h-5 w-5 cursor-pointer rounded border-gray-300 bg-white group-hover:block",
                                {
                                    block: false,
                                },
                            )}
                        />
                        <CalendarIcon className="text-muted-foreground h-5 w-5" />
                        <h2 className="text-xl font-semibold">{group.formattedDate}</h2>
                        <span className="text-muted-foreground text-sm">
                            ({group.images.length} {group.images.length === 1 ? "image" : "images"})
                        </span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {group.images.map((image) => (
                            <div
                                key={image.id}
                                className="group bg-background relative overflow-hidden rounded-lg border transition-all hover:shadow-xs"
                            >
                                <div className="relative aspect-square">
                                    <img
                                        src={image.url}
                                        alt={image.filename}
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div
                                        className={cn(
                                            "absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100",
                                            {
                                                "opacity-100": selectedImages.includes(image.id),
                                            },
                                        )}
                                    >
                                        <Checkbox
                                            id={`select-${image.id}`}
                                            checked={selectedImages.includes(image.id)}
                                            onCheckedChange={() => onCheckboxClick([image.id])}
                                            className="h-5 w-5 cursor-pointer rounded border-gray-300 bg-white"
                                        />
                                    </div>
                                    <DeleteImage
                                        image={image}
                                        onDelete={onDeleteImage}
                                        className={cn(
                                            buttonVariants({ variant: "destructive", size: "sm" }),
                                            "absolute top-2 right-2 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100",
                                        )}
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium">{image.filename}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {format(image.created_at, "h:mm a")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
