export const imageUploadHandler = async (file: File) => {
    try {
        const data = new FormData();
        data.append("image", file);
        const response = await window.axios.post("/upload-image", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.url;
    } catch (error) {
        console.error("Image upload failed:", error);
    }
};
