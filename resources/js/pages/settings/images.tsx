import type { TSharedData } from "@/types";

import { useForm, usePage } from "@inertiajs/react";

import { SwitchToggle } from "@/components/inputs/switch-toggle";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";

const NotesSettings = () => {
    const options = usePage<TSharedData>().props.auth.options;

    const { data, setData, patch, processing, recentlySuccessful } = useForm<{
        images_initial_view_mode: boolean;
    }>({
        images_initial_view_mode: options.images_initial_view_mode,
    });

    return (
        <SettingsLayout title="Images settings">
            <SettingsSection
                title="Images settings"
                description="Update your account's images options"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        patch(route("settings.images.update"));
                    }}
                    className="space-y-6"
                >
                    <div className="grid gap-4">
                        <SwitchToggle
                            name="initial-view-mode"
                            value={data.images_initial_view_mode}
                            onValue={(value) => setData("images_initial_view_mode", value)}
                            label="Initial View Mode"
                            tooltip="Toggle between Grid view (ON) and List view (OFF) as the default display mode when viewing images"
                        />
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
