import type { TBreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layouts/base-layout";
import { AdminShell } from "./admin-shell";
import { AdminSidebar } from "./admin-sidebar";
import { AdminSidebarHeader } from "./admin-sidebar-header";
import { Content } from "./content";

export const AdminSidebarLayout = ({
    children,
    breadcrumbs = [],
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumbItem[];
}) => {
    return (
        <BaseLayout>
            <AdminShell variant="sidebar">
                <AdminSidebar />
                <Content variant="sidebar">
                    <AdminSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </Content>
            </AdminShell>
        </BaseLayout>
    );
};
