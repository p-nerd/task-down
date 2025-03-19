import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { TNavItem } from "@/types";

import { Link } from "@inertiajs/react";
import { BookOpenIcon, FolderIcon, LayoutGridIcon } from "lucide-react";

import { AdminLogo } from "./admin-logo";
import { NavFooter } from "./nav-footer";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const mainNavItems: TNavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGridIcon,
    },
];

const footerNavItems: TNavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: FolderIcon,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits",
        icon: BookOpenIcon,
    },
];

export const AdminSidebar = () => {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AdminLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};
