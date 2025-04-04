import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Message } from "../elements/message";
import { TooltipInfo } from "../elements/tooltip-info";

export const RadioOptions = ({
    name,
    value,
    onValue,
    options,
    label,
    tooltip,
    error,
}: {
    name: string;
    value: string;
    onValue: (value: string) => void;
    options: { label: string; value: string }[];
    label: string;
    tooltip?: string;
    error?: string;
}) => {
    return (
        <div>
            <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">{label}</div>
                {tooltip && <TooltipInfo info={tooltip} />}
            </div>
            <RadioGroup
                id={name}
                name={name}
                value={value}
                onValueChange={(value) => onValue(value)}
                className="ml-2 flex flex-col"
            >
                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                        <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                    </div>
                ))}
            </RadioGroup>
            <Message error={error} />
        </div>
    );
};
