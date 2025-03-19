import type { SharedData } from "@/types";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";

import { Navigation } from "./app2/navigation";
import { ProfileDropdown } from "./app2/profile-dropdown";
import { ThemeSwitcher } from "./app2/theme-switcher";

export const App2Layout = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const { user } = usePage<SharedData>().props.auth;

    return (
        <div className="mx-auto flex max-w-7xl flex-col p-2">
            <nav className="bg-card text-card-foreground flex w-full items-center justify-between space-x-2 border-b">
                <Navigation />
                <ThemeSwitcher />
                <ProfileDropdown user={user} />
            </nav>
            <main className={cn("bg-background flex-1 overflow-auto", className)}>{children}</main>
        </div>
    );
};
