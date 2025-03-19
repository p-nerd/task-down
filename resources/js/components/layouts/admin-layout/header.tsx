import type { BreadcrumbItem } from "@/types";
import type { ReactNode } from "react";

import { AppContent } from "@/components/app-content";
import { AppHeader } from "@/components/app-header";
import { AppShell } from "@/components/app-shell";

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
