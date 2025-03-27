import { toast as sonner } from "sonner";

export const toast = {
    error: (message: string) => {
        sonner.error(message, {
            action: {
                label: "Hide",
                onClick: () => {},
            },
        });
    },
};
