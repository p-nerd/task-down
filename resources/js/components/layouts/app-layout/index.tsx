import type { SharedData } from "@/types";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";

import { HeaderNavigation } from "./header-navigation";
import { ProfileDropdown } from "./profile-dropdown";

const AppLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { user } = usePage<SharedData>().props.auth;

    return (
        <div className="mx-auto flex max-w-7xl flex-col p-2">
            <nav className="bg-card text-card-foreground flex w-full items-center justify-between space-x-2 border-b">
                <HeaderNavigation />
                <ProfileDropdown user={user} />
            </nav>
            <main className={cn("bg-background flex-1 overflow-auto", className)}>{children}</main>
        </div>
    );
};

export { AppLayout };
