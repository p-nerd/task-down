import { useForm } from "@inertiajs/react";

import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSection } from "@/components/screens/settings/settings-section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Transition } from "@headlessui/react";
import { HelpCircle } from "lucide-react";

const NotesSettings = ({ initial_sidebar_visibility }: { initial_sidebar_visibility: boolean }) => {
    const { data, setData, patch, processing, recentlySuccessful } = useForm<{
        initial_sidebar_visibility: boolean;
    }>({
        initial_sidebar_visibility,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch("/settings/notes");
    };

    return (
        <SettingsLayout title="Notes settings">
            <SettingsSection
                title="Notes options"
                description="Update your account's notes settings"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <Switch
                                id="initial-sidebar-visibility"
                                checked={data.initial_sidebar_visibility}
                                onCheckedChange={(checked) =>
                                    setData("initial_sidebar_visibility", checked)
                                }
                            />
                            <Label htmlFor="initial-sidebar-visibility">
                                Initial Sidebar Visibility
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">
                                            Show sidebar by default when opening single note
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Save changes
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
                </form>
            </SettingsSection>
        </SettingsLayout>
    );
};

export default NotesSettings;
