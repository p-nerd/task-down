import type { ReactNode } from "react";

import { HeadingSmall } from "@/components/elements/heading-small";

export const SettingsSection = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) => {
    return (
        <div className="space-y-6">
            <HeadingSmall title={title} description={description} />
            {children}
        </div>
    );
};
