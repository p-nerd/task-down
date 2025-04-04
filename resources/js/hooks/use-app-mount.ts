import type { TSharedData } from "@/types";

import { useImagesStore } from "@/states/images";
import { useNotesStore } from "@/states/notes";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export const useAppMount = () => {
    const { options } = usePage<TSharedData>().props.auth;
    const { sidebarVisible, setSidebarVisible, editorMode, setEditorMode } = useNotesStore();
    const { viewMode, setViewMode } = useImagesStore();

    useEffect(() => {
        if (sidebarVisible === null) {
            setSidebarVisible(options.notes_initial_sidebar_visibility);
        }
    }, []);

    useEffect(() => {
        if (editorMode === null) {
            setEditorMode(options.notes_initial_editor_mode);
        }
    }, []);

    useEffect(() => {
        if (viewMode === null) {
            setViewMode(options.images_initial_view_mode);
        }
    }, []);
};
