import type { TGroupImage } from "@/lib/images";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, FileIcon, Trash2Icon } from "lucide-react";

export const ListViewLoading = () => {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((group) => (
                <div key={group} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-px w-full" />
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-background flex items-center gap-4 rounded-lg border p-3"
                            >
                                <Skeleton className="h-16 w-16 rounded" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ListView = ({
    groupedImages,
    onDeleteImage,
}: {
    groupedImages: TGroupImage[];
    onDeleteImage: (imageId: string) => void;
}) => {
    return (
        <div className="space-y-8 pr-4">
            {groupedImages.map((group) => (
                <div key={group.date} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="text-muted-foreground h-5 w-5" />
                        <h2 className="text-xl font-semibold">{group.formattedDate}</h2>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        {group.images.map((image) => (
                            <div
                                key={image.id}
                                className="group bg-background flex items-center gap-4 rounded-lg border p-3 transition-all hover:shadow-xs"
                            >
                                <div className="relative h-16 w-16 min-w-16 overflow-hidden rounded">
                                    <img
                                        src={image.url}
                                        alt={image.filename}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <FileIcon className="text-muted-foreground h-4 w-4" />
                                        <h3 className="truncate font-medium">{image.filename}</h3>
                                    </div>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {format(image.created_at, "h:mm a")}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:bg-destructive/10 cursor-pointer"
                                    onClick={() => onDeleteImage(image.id)}
                                    aria-label={`Delete ${image.filename}`}
                                >
                                    <Trash2Icon className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
