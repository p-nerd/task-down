import { useNotesStore } from "@/states/notes";

import { Button } from "@/components/ui/button";
import { PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";

export const SidebarToggle = () => {
    const { sidebarVisible, setSidebarVisible } = useNotesStore();

    return (
        <Button
            size="icon"
            variant="outline"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="mr-2 cursor-pointer"
        >
            {sidebarVisible ? (
                <PanelLeftCloseIcon className="h-4 w-4" />
            ) : (
                <PanelLeftIcon className="h-4 w-4" />
            )}
        </Button>
    );
};
