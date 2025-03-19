import { useCallback, useRef } from "react";

type TDebounceFn<T> = (value: T) => void;

const useDebounce = <T>(callback: (value: T) => void, delay: number = 250): TDebounceFn<T> => {
    const timeoutRef = useRef<any>(null);

    const debouncedFn = useCallback(
        (value: T) => {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a new timeout
            timeoutRef.current = setTimeout(() => {
                callback(value);
            }, delay);
        },
        [callback, delay],
    );

    return debouncedFn;
};

export { useDebounce };
