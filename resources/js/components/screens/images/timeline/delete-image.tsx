import type { TImage } from "@/types/models";

import { useState } from "react";

import { Confirmation } from "@/components/elements/confirmation";
import { Trash2Icon } from "lucide-react";

export const DeleteImage = ({
    image,
    className,
    onDelete,
}: {
    image: TImage;
    className: string;
    onDelete: (imageId: string, onSuccess: () => void) => void;
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <button
                className={className}
                aria-label={`Delete ${image.filename}`}
                onClick={() => setOpen(true)}
            >
                <Trash2Icon className="h-4 w-4" />
            </button>
            <Confirmation
                open={open}
                onOpen={setOpen}
                onConfirmAction={() =>
                    onDelete(image.id, () => {
                        setOpen(false);
                    })
                }
                description={`This action will permanently delete the ${image.filename} image`}
                confirmActionText="Delete"
            />
        </>
    );
};
