import type { TSharedData } from "@/types";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useNotesStore } from "@/states/notes";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

import { BaseLayout } from "@/components/layouts/base-layout";
import { HeaderNavigation } from "./header-navigation";
import { ProfileDropdown } from "./profile-dropdown";

const AppLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { user, options } = usePage<TSharedData>().props.auth;
    const { sidebarVisible, setSidebarVisible } = useNotesStore();

    useEffect(() => {
        if (sidebarVisible === null) {
            setSidebarVisible(options.notes_initial_sidebar_visibility);
        }
    }, []);

    return (
        <BaseLayout className="max-w-app mx-auto flex flex-col p-2">
            <nav className="bg-card text-card-foreground flex w-full items-center justify-between space-x-2 border-b">
                <HeaderNavigation />
                <ProfileDropdown user={user} />
            </nav>
            <main className={cn("bg-background flex-1 overflow-auto", className)}>{children}</main>
        </BaseLayout>
    );
};

export { AppLayout };
