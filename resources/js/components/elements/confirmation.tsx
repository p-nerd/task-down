import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { ReactNode } from "react";

export const Confirmation = ({
    open,
    onOpen,
    onConfirmAction,
    title,
    description,
    confirmActionText,
}: {
    open: boolean;
    onOpen: (open: boolean) => void;
    onConfirmAction: () => void;
    title?: string;
    description?: ReactNode;
    confirmActionText?: string;
}) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description || "This action will permanently delete the data"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirmAction}
                        className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                    >
                        {confirmActionText || "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
