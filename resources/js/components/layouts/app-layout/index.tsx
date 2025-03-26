import type { TSharedData } from "@/types";
import type { ReactNode } from "react";

import { useAppMount } from "@/hooks/use-app-mount";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";

import { BaseLayout } from "@/components/layouts/base-layout";
import { HeaderNavigation } from "./header-navigation";
import { ProfileDropdown } from "./profile-dropdown";

const AppLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { user } = usePage<TSharedData>().props.auth;

    useAppMount();

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
