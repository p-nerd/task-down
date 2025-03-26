import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export const TooltipInfo = ({ info, children }: { info: ReactNode; children?: ReactNode }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children || <InfoIcon className="h-4 w-4 cursor-help" />}
                </TooltipTrigger>
                <TooltipContent>{info}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
