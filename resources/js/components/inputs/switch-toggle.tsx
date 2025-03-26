import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export const SwitchToggle = ({
    name,
    value,
    onValue,
    label,
    tooltip,
}: {
    name: string;
    value: boolean;
    onValue: (value: boolean) => void;
    label: string;
    tooltip?: string;
}) => {
    return (
        <div className="flex items-center gap-3">
            <Switch
                id={name}
                name={name}
                checked={value}
                onCheckedChange={(checked) => onValue(checked)}
            />
            <Label htmlFor="initial-sidebar-visibility">{label}</Label>
            {tooltip && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
};
