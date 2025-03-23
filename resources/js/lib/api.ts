import type { TImage } from "@/types/models";

import { toast } from "./toast";
import { error } from "./utils";

export const imageUploadHandler = async (image: File): Promise<string> => {
    try {
        const data = new FormData();
        data.append("image", image);

        const response = await window.axios.post<TImage>(route("api.images.store"), data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        });

        return response.data.url;
    } catch (e: any) {
        toast.error("Image upload failed: " + error(e));
        return "";
    }
};
