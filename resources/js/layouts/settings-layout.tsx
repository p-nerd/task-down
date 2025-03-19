import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Heading } from "@/components/elements/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";
import { App2Layout } from "./app2-layout";

const links: { title: string; route: string; icon: LucideIcon | null }[] = [
    {
        title: "Profile",
        route: "settings.profile.edit",
        icon: null,
    },
    {
        title: "Password",
        route: "settings.password.edit",
        icon: null,
    },
    {
        title: "Appearance",
        route: "settings.appearance.edit",
        icon: null,
    },
];

export const SettingsLayout = ({ children }: { children: ReactNode }) => {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === "undefined") {
        return null;
    }

    return (
        <App2Layout>
            <div className="px-4 py-6">
                <Heading title="Settings" description="Manage your profile and account settings" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {links.map((item) => (
                                <Button
                                    key={item.route}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn("w-full justify-start", {
                                        "bg-muted": route().current(item.route),
                                    })}
                                >
                                    <Link href={route(item.route)} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>
                    <Separator className="my-6 md:hidden" />
                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">{children}</section>
                    </div>
                </div>
            </div>
        </App2Layout>
    );
};
