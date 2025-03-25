import { useImagesStore } from "@/states/images";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export const DownloadImageButton = () => {
    const { previewImage } = useImagesStore();

    const handleDownload = async () => {
        if (!previewImage) return;

        try {
            const response = await fetch(previewImage.url);
            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = previewImage.filename;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            title="Download image"
            className="cursor-pointer"
        >
            <DownloadIcon className="h-4 w-4" />
        </Button>
    );
};
