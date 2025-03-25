import { useImagesStore } from "@/states/images";
import { router } from "@inertiajs/react";
import { useState } from "react";

import { Confirmation } from "@/components/elements/confirmation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2Icon } from "lucide-react";

export const DeleteBatch = () => {
    const [open, setOpen] = useState(false);

    const { selectedImageIds, setSelectedImageIds } = useImagesStore();

    return (
        <>
            <div className="bg-muted flex items-center justify-between rounded-lg px-5 py-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="select-all"
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 bg-white"
                        checked={selectedImageIds.length > 0}
                        onCheckedChange={() => setSelectedImageIds([])}
                    />
                    <span className="font-medium">{selectedImageIds.length} items selected</span>
                </div>
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
                        This action will permanently delete {selectedImageIds.length} selected{" "}
                        {selectedImageIds.length === 1 ? "item" : "items"}. This action cannot be
                        undone.
                    </>
                }
                actionText="Delete"
                onAction={() => {
                    router.delete(route("images.destroys"), {
                        data: { ids: selectedImageIds },
                        onSuccess: () => {
                            setSelectedImageIds([]);
                            setOpen(false);
                        },
                    });
                }}
            />
        </>
    );
};
