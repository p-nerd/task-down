import type { ReactNode } from "react";

import AuthLayoutTemplate from "./auth-simple-layout";

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
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
};

export { AuthLayout };
