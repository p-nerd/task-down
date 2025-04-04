import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const add = (a: number, b: number) => {
    return a + b;
};

export const error = (e: any): string => {
    return (
        e.response?.data?.message ||
        e.response?.data?.error ||
        e.message ||
        "Unknown error occurred"
    );
};
