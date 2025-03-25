import type { TImage } from "@/types/models";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useImagesStore = create(
    immer<{
        selectedImageIds: string[];
        setSelectedImageIds: (imageIds: string[]) => void;
        toggleSelectedImageId: (imageId: string) => void;
        previewImage: TImage | null;
        setPreviewImage: (image: TImage | null) => void;
    }>((set) => ({
        selectedImageIds: [],
        setSelectedImageIds: (images) => set({ selectedImageIds: images }),
        toggleSelectedImageId: (imageId) => {
            set((state) => {
                if (state.selectedImageIds.includes(imageId)) {
                    state.selectedImageIds = state.selectedImageIds.filter((i) => i !== imageId);
                } else {
                    state.selectedImageIds.push(imageId);
                }
            });
        },
        previewImage: null,
        setPreviewImage: (image) => set({ previewImage: image }),
    })),
);
