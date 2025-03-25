import { useImagesStore } from "@/states/images";
import { format } from "date-fns";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DownloadImageButton } from "./download-image-button";

export const PreviewImageModal = () => {
    const { previewImage, setPreviewImage } = useImagesStore();

    if (!previewImage) return <></>;

    return (
        <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
            <DialogContent className="flex h-full max-h-[90vh] flex-col p-0 sm:max-w-4xl">
                <div className="flex items-center space-x-3 border-b p-4">
                    <DownloadImageButton />
                    <div>
                        <h3 className="font-medium">{previewImage.filename}</h3>
                        <p className="text-muted-foreground text-sm">
                            {format(previewImage.created_at, "PPP 'at' h:mm a")}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center p-4">
                    <img
                        src={previewImage.url}
                        alt={previewImage.filename}
                        className="max-h-[calc(90vh-8rem)] max-w-full object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
