import type { ReactNode } from "react";

import { useBaseMount } from "@/hooks/use-base-mount";

import { Toaster } from "@/components/ui/sonner";

export const BaseLayout = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    useBaseMount();

    return (
        <>
            <div className={className}>{children}</div>
            <Toaster />
        </>
    );
};
