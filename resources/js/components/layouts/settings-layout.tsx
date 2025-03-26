import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Heading } from "@/components/elements/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeftIcon, ImagesIcon, LockIcon, NotebookIcon, UserIcon } from "lucide-react";

import { AppLayout } from "./app-layout";

const links: { title: string; route: string; icon: LucideIcon }[] = [
    {
        title: "Profile",
        route: "settings.profile.edit",
        icon: UserIcon,
    },
    {
        title: "Password",
        route: "settings.password.edit",
        icon: LockIcon,
    },
    // {
    //     title: "Appearance",
    //     route: "settings.appearance.edit",
    //     icon: PaletteIcon,
    // },
    {
        title: "Notes",
        route: "settings.notes.edit",
        icon: NotebookIcon,
    },
    {
        title: "Images",
        route: "settings.images.edit",
        icon: ImagesIcon,
    },
];

const SettingsLayout = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <AppLayout>
            <Head title={title} />
            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading
                        title="Settings"
                        description="Manage your profile and account settings"
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground flex items-center"
                        onClick={() => history.back()}
                    >
                        <ArrowLeftIcon className="size-4" />
                        Got Back
                    </Button>
                </div>
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
                                    <Link
                                        href={route(item.route)}
                                        prefetch
                                        className="flex items-center"
                                    >
                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
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
        </AppLayout>
    );
};

export { SettingsLayout };
