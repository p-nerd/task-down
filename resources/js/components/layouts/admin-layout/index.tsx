import type { BreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { AdminSidebarLayout } from "./sidebar";

const AdminLayout = ({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) => {
    return <AdminSidebarLayout breadcrumbs={breadcrumbs}>{children}</AdminSidebarLayout>;
};

export default { AdminLayout };
