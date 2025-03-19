import type { BreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { AppContent } from "./app-content";
import { AppShell } from "./app-shell";
import { AppSidebar } from "./app-sidebar";
import { AppSidebarHeader } from "./app-sidebar-header";

export const AdminSidebarLayout = ({
    children,
    breadcrumbs = [],
}: {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) => {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
};
