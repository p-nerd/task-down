import { useForm } from "@inertiajs/react";

import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
                    <SettingsSaveButton
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                    />
                </form>
            </SettingsSection>
        </SettingsLayout>
    );
};

export default NotesSettings;
