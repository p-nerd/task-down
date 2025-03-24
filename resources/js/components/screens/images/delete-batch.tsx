import { useState } from "react";

import { Confirmation } from "@/components/elements/confirmation";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteBatch = ({
    selectedImages,
    onDelete,
}: {
    selectedImages: string[];
    onDelete: (images: string[], onSuccess: () => void) => void;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-muted flex items-center justify-between rounded-lg px-5 py-3">
                <span className="font-medium">{selectedImages.length} items selected</span>
                <Button
                    variant="destructive"
                    size="sm"
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => setOpen(true)}
                >
                    <Trash2Icon className="h-4 w-4" />
                    Delete Selected
                </Button>
            </div>
            <Confirmation
                open={open}
                onOpen={setOpen}
                description={
                    <>
                        This action will permanently delete {selectedImages.length} selected{" "}
                        {selectedImages.length === 1 ? "item" : "items"}. This action cannot be
                        undone.
                    </>
                }
                confirmActionText="Delete"
                onConfirmAction={() => {
                    onDelete(selectedImages, () => {
                        setOpen(false);
                    });
                }}
            />
        </>
    );
};
