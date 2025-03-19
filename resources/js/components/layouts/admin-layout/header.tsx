import type { BreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { AppContent } from "./app-content";
import { AppHeader } from "./app-header";
import { AppShell } from "./app-shell";

export const AdminHeaderLayout = ({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) => {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
};
