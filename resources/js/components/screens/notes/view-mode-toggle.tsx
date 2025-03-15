import { useNotes } from "~/states/notes";

import { LayoutGridIcon, LayoutListIcon } from "~/components/composite/icons";
import { Button } from "~/components/ui/button";

export const ViewModeToggle = () => {
    const { viewMode, setViewMode, setActiveNoteId } = useNotes();

    return (
        <Button
            size="icon"
            variant="outline"
            className="group"
            onClick={() => {
                if (viewMode === "list") {
                    setViewMode("grid");
                    setActiveNoteId(null);
                } else {
                    setViewMode("list");
                }
            }}
        >
            {viewMode === "list" ? (
                <LayoutGridIcon className="h-4 w-4" />
            ) : (
                <LayoutListIcon className="h-4 w-4" />
            )}
        </Button>
    );
};
