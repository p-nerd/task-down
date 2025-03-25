import type { TGroupImage } from "@/lib/images";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImagesStore } from "@/states/images";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FileIcon } from "lucide-react";
import { DeleteImage } from "./delete-image";
import { GroupDateLabel } from "./group-date-label";

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
    onDeleteImage: (imageId: string, onSuccess: () => void) => void;
}) => {
    const { selectedImageIds, toggleSelectedImageId, setPreviewImage } = useImagesStore();

    return (
        <div className="space-y-8 pr-4">
            {groupedImages.map((group) => (
                <div key={group.date} className="space-y-4">
                    <GroupDateLabel group={group} />
                    <Separator />
                    <div className="space-y-3">
                        {group.images.map((image) => (
                            <div
                                key={image.id}
                                className="group bg-background flex items-center gap-4 rounded-lg border p-3 transition-all hover:shadow-xs"
                            >
                                <Checkbox
                                    id={`select-${image.id}`}
                                    checked={selectedImageIds.includes(image.id)}
                                    onCheckedChange={() => toggleSelectedImageId(image.id)}
                                    aria-label={`Select ${image.filename}`}
                                    className="mr-1 cursor-pointer"
                                />
                                <div className="relative h-16 w-16 min-w-16 overflow-hidden rounded">
                                    <img
                                        src={image.url}
                                        alt={image.filename}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        onClick={() => setPreviewImage(image)}
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
                                <DeleteImage
                                    image={image}
                                    onDelete={onDeleteImage}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                        "text-destructive hover:bg-destructive/10 cursor-pointer",
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
