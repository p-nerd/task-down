import type { TBreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layouts/base-layout";

import { Content } from "./content";
import { Shell } from "./shell";
import { Sidebar } from "./sidebar";
import { SidebarHeader } from "./sidebar-header";

export const AdminSidebarLayout = ({
    children,
    breadcrumbs = [],
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumbItem[];
}) => {
    return (
        <BaseLayout>
            <Shell variant="sidebar">
                <Sidebar />
                <Content variant="sidebar">
                    <SidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </Content>
            </Shell>
        </BaseLayout>
    );
};
