import type { TViewMode } from "@/states/images";
import type { TEditorMode } from "@/states/notes";
import type { LucideIcon } from "lucide-react";
import type { Config } from "ziggy-js";
import type { TUser } from "./models";

export type TSharedData<T = unknown> = {
    name: string;
    quote: {
        message: string;
        author: string;
    };
    auth: {
        user: TUser;
        options: {
            notes_initial_sidebar_visibility: boolean;
            images_initial_view_mode: TViewMode;
            notes_initial_editor_mode: TEditorMode;
        };
    };
    ziggy: Config & {
        location: string;
    };
} & T;

export type TBreadcrumbItem = {
    title: string;
    href: string;
};

export type TNavItem = {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type TPaginate<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};
