import type { TImagesViewMode } from "@/types";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GridIcon, ListIcon } from "lucide-react";

export const ToggleView = ({
    view,
    onChange,
}: {
    view: TImagesViewMode;
    onChange: (view: TImagesViewMode) => void;
}) => {
    return (
        <ToggleGroup type="single" value={view} onValueChange={onChange} className="shadow-xs">
            <ToggleGroupItem value="grid" aria-label="Grid view" className="cursor-pointer">
                <GridIcon className="mr-2 h-4 w-4" />
                Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" className="cursor-pointer">
                <ListIcon className="mr-2 h-4 w-4" />
                List
            </ToggleGroupItem>
        </ToggleGroup>
    );
};
