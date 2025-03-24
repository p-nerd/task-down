import type { TGroupImage } from "@/lib/images";

import { cn } from "@/lib/utils";
import { useImagesStore } from "@/states/images";

import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";

export const GroupDateLabel = ({ group }: { group: TGroupImage }) => {
    const { selectedImageIds, setSelectedImageIds } = useImagesStore();

    let isCheck = true;
    group.images.forEach((image) => {
        if (!selectedImageIds.find((i) => i === image.id)) {
            isCheck = false;
        }
    });

    return (
        <div className="group flex items-center gap-2">
            <Checkbox
                id={`select-${group.date}`}
                checked={isCheck}
                // onCheckedChange={() => setSelectedImageIds(group.images.map((i) => i.id))}
                className={cn(
                    "hidden h-5 w-5 cursor-pointer rounded border-gray-300 bg-white group-hover:block",
                    {
                        block: isCheck,
                    },
                )}
            />
            <CalendarIcon className="text-muted-foreground h-5 w-5" />
            <h2 className="text-xl font-semibold">{group.formattedDate}</h2>
            <span className="text-muted-foreground text-sm">
                ({group.images.length} {group.images.length === 1 ? "image" : "images"})
            </span>
        </div>
    );
};
