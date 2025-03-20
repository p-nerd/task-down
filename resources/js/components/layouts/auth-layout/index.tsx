import type { ReactNode } from "react";

import { AuthSimpleLayout } from "./auth-simple-layout";

const AuthLayout = ({
    children,
    title,
    description,
}: {
    children: ReactNode;
    title: string;
    description: string;
}) => {
    return (
        <AuthSimpleLayout title={title} description={description}>
            {children}
        </AuthSimpleLayout>
    );
};

export { AuthLayout };
