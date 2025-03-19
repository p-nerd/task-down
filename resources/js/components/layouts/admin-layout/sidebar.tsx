import type { BreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { AdminShell } from "./admin-shell";
import { AdminSidebar } from "./admin-sidebar";
import { AdminSidebarHeader } from "./admin-sidebar-header";
import { Content } from "./content";

export const AdminSidebarLayout = ({
    children,
    breadcrumbs = [],
}: {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) => {
    return (
        <AdminShell variant="sidebar">
            <AdminSidebar />
            <Content variant="sidebar">
                <AdminSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </Content>
        </AdminShell>
    );
};
