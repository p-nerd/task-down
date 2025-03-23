import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

export const BaseLayout = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <>
            <div className={className}>{children}</div>
            <Toaster />
        </>
    );
};
