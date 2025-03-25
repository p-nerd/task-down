import { useImagesStore } from "@/states/images";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DownloadIcon } from "lucide-react";

export const PreviewImageModal = () => {
    const { previewImage, setPreviewImage } = useImagesStore();

    const handleDownload = () => {
        if (!previewImage) return;
        const link = document.createElement("a");
        link.href = previewImage.url;
        link.download = previewImage.filename;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-4xl">
                {previewImage && (
                    <div className="flex h-full flex-col">
                        <div className="flex items-center space-x-3 border-b p-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleDownload}
                                title="Download image"
                                className="cursor-pointer"
                            >
                                <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <div>
                                <h3 className="font-medium">{previewImage.filename}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {format(previewImage.created_at, "PPP 'at' h:mm a")}
                                </p>
                            </div>
                        </div>
                        <div className="relative flex-1 overflow-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <img
                                    src={previewImage.url}
                                    alt={previewImage.filename}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
