import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const Messsage = ({
    error: message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { error?: string }) => {
    return message ? (
        <p {...props} className={cn("text-sm text-red-600 dark:text-red-400", className)}>
            {message}
        </p>
    ) : null;
};

export { Messsage };
