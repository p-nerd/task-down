import { toast } from "./toast";
import { error } from "./utils";

export const imageUploadHandler = async (file: File) => {
    try {
        const data = new FormData();
        data.append("image", file);
        const response = await window.axios.post(route("api.images.store"), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.url;
    } catch (e: any) {
        toast.error("Image upload failed:", { description: error(e) });
    }
};
