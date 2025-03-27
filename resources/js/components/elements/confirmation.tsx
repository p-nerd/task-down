import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { ReactNode } from "react";

import { CheckIcon, XIcon } from "lucide-react";

export const Confirmation = ({
    title,
    description,
    actionText,
    onAction,
    children,
}: {
    title?: string;
    description?: ReactNode;
    actionText?: string;
    onAction: () => void;
    children: ReactNode;
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description || "This action will permanently delete the data"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        <XIcon className="mr-2 h-4 w-4" />
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onAction}
                        className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                    >
                        <CheckIcon className="mr-2 h-4 w-4" />
                        {actionText || "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
