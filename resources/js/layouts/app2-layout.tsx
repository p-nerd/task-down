import type { SharedData } from "@/types";

import { usePage } from "@inertiajs/react";

import { Navigation } from "./app2/navigation";
import { Profile } from "./app2/profile";
import { ThemeSwitcher } from "./app2/theme-switcher";

export const App2Layout = () => {
    const { user } = usePage<SharedData>().props.auth;

    return (
        <div className="mx-auto flex max-w-7xl flex-col p-2">
            <nav className="bg-card text-card-foreground flex w-full items-center justify-between space-x-2 border-b">
                <Navigation />
                <ThemeSwitcher />
                <Profile user={user} />
            </nav>
            <main className="bg-background flex-1 overflow-auto pt-4"></main>
        </div>
    );
};
