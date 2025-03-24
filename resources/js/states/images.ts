import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useImagesStore = create(
    immer<{
        selectedImageIds: string[];
        setSelectedImageIds: (imageIds: string[]) => void;
        toggleSelectedImageId: (imageId: string) => void;
    }>((set) => ({
        selectedImageIds: [],
        setSelectedImageIds: (images: string[]) => set({ selectedImageIds: images }),
        toggleSelectedImageId: (imageId) => {
            set((state) => {
                if (state.selectedImageIds.includes(imageId)) {
                    state.selectedImageIds = state.selectedImageIds.filter((i) => i !== imageId);
                } else {
                    state.selectedImageIds.push(imageId);
                }
            });
        },
    })),
);
