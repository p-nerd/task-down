import { toast } from "./toast";

export const imageUploadHandler = async (file: File) => {
    try {
        const data = new FormData();
        data.append("image", file);
        const response = await window.axios.post(route("api.images.store"), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.url;
    } catch (error: any) {
        toast.error("Image upload failed:", {
            description: error?.message,
        });
    }
};
