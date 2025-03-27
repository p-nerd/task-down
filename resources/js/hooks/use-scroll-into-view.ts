import { useEffect, useRef } from "react";

export const useScrollIntoView = (dependencies: unknown[] = []) => {
    const scrollIntoViewRef = useRef<any>(null);

    useEffect(() => {
        if (scrollIntoViewRef.current) {
            scrollIntoViewRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, dependencies);

    return { scrollIntoViewRef };
};
