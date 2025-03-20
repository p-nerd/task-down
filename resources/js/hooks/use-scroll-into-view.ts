import { useEffect, useRef } from "react";

export const useScrollIntoView = () => {
    const ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, []);

    return ref;
};
