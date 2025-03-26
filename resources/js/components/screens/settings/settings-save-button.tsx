import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";

export const SettingsSaveButton = ({
    processing,
    recentlySuccessful,
    buttonText,
}: {
    processing: boolean;
    recentlySuccessful: boolean;
    buttonText?: string;
}) => {
    return (
        <div className="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
                {buttonText || "Save changes"}
            </Button>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-neutral-600">Saved</p>
            </Transition>
        </div>
    );
};
