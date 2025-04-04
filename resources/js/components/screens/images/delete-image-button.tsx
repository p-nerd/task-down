import type { TImage } from "@/types/models";

import { useImagesStore } from "@/states/images";
import { router } from "@inertiajs/react";

import { Confirmation } from "@/components/elements/confirmation";
import { Trash2Icon } from "lucide-react";

export const DeleteImageButton = ({ image, className }: { image: TImage; className: string }) => {
    const { selectedImageIds, setSelectedImageIds } = useImagesStore();

    return (
        <>
            <Confirmation
                onAction={() => {
                    router.delete(route("images.destroy", image.id));
                    setSelectedImageIds(selectedImageIds.filter((id) => id !== image.id));
                }}
                description={`This action will permanently delete the ${image.filename} image`}
                actionText="Delete"
            >
                <button className={className} aria-label={`Delete ${image.filename}`}>
                    <Trash2Icon className="h-4 w-4" />
                </button>
            </Confirmation>
        </>
    );
};
