import type { TBreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { AdminSidebarLayout } from "./admin-sidebar-layout";

const AdminLayout = ({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumbItem[];
}) => {
    return <AdminSidebarLayout breadcrumbs={breadcrumbs}>{children}</AdminSidebarLayout>;
};

export { AdminLayout };
