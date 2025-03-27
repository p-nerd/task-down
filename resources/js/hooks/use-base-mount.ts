import type { TSharedData } from "@/types";

import { toast } from "@/lib/toast";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export const useBaseMount = () => {
    const { errors } = usePage<TSharedData>().props;

    useEffect(() => {
        for (const error in errors) {
            toast.error(errors[error]);
        }
    }, [errors]);
};
