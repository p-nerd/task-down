import type { TNote } from "@/types/models";

export const navigate = {
    note: (note: TNote | null) => {
        const url = note ? `/notes?id=${note?.id}` : "/notes";
        window.history.pushState({}, "", url);
    },
};
