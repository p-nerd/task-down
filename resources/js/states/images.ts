import type { TImage } from "@/types/models";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TViewMode = "grid" | "list";

export const useImagesStore = create(
    immer<{
        viewMode: TViewMode | null;
        setViewMode: (viewMode: TViewMode | null) => void;

        selectedImageIds: string[];
        setSelectedImageIds: (selectedImageIds: string[]) => void;
        toggleSelectedImageId: (imageId: string) => void;

        previewImage: TImage | null;
        setPreviewImage: (image: TImage | null) => void;
    }>((set) => ({
        viewMode: null,
        setViewMode: (viewMode) => set({ viewMode }),

        selectedImageIds: [],
        setSelectedImageIds: (selectedImageIds) => set({ selectedImageIds }),
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
