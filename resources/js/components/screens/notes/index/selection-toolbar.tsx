import { useNotesStore } from "@/states/notes";

import { Button } from "@/components/ui/button";
import { ArchiveIcon, CheckSquare, PinIcon, Square, Trash2, XIcon } from "lucide-react";

export const SelectionToolbar = () => {
    const { selectedNoteIds } = useNotesStore();

    const allSelected = false;
    const isLoading = false;

    return (
        <div className="bg-primary text-primary-foreground fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 transform items-center space-x-3 rounded-lg px-4 py-2 shadow-lg transition-all duration-300">
            <div className="flex items-center">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    <span>{allSelected ? "Deselect All" : "Select All"}</span>
                </Button>
            </div>

            <div className="bg-primary-foreground/20 h-6 w-px" />

            <div className="text-sm font-medium">{selectedNoteIds.length} selected</div>

            <div className="bg-primary-foreground/20 h-6 w-px" />

            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={selectedNoteIds.length === 0 || isLoading}
                    title="Pin selected"
                >
                    <PinIcon size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={selectedNoteIds.length === 0 || isLoading}
                    title="Archive selected"
                >
                    <ArchiveIcon size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={selectedNoteIds.length === 0 || isLoading}
                    title="Delete selected"
                    className="text-red-500 hover:text-red-400"
                >
                    <Trash2 size={16} />
                </Button>
            </div>
            <div className="bg-primary-foreground/20 h-6 w-px" />
            <Button variant="ghost" size="sm" title="Exit selection mode">
                <XIcon size={16} />
            </Button>
        </div>
    );
};
