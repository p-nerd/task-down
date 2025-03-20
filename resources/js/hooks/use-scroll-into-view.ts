import { useEffect, useRef } from "react";

export const useScrollIntoView = () => {
    const scrollIntoViewRef = useRef<any>(null);

    useEffect(() => {
        if (scrollIntoViewRef.current) {
            scrollIntoViewRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, []);

    return { scrollIntoViewRef };
};
