import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TooltipInfo } from "../elements/tooltip-info";

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
            {tooltip && <TooltipInfo info={tooltip} />}
        </div>
    );
};
