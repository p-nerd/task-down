import type { TQueryParams } from "@/types/utils";
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

export const getQueryParams = (url: string): TQueryParams => {
    let urlObj: URL;
    try {
        urlObj = new URL(url);
    } catch (error) {
        console.error("Invalid URL:", error);
        return {};
    }

    const searchParams: URLSearchParams = urlObj.searchParams;

    const params: TQueryParams = {};

    searchParams.forEach((value: string, key: string) => {
        if (params[key]) {
            if (!Array.isArray(params[key])) {
                params[key] = [params[key] as string];
            }
            (params[key] as string[]).push(value);
        } else {
            params[key] = value;
        }
    });

    return params;
};
