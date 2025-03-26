import type { TSharedData } from "@/types";

import { useForm, usePage } from "@inertiajs/react";

import { SwitchToggle } from "@/components/inputs/switch-toggle";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";

const NotesSettings = () => {
    const options = usePage<TSharedData>().props.auth.options;

    const { data, setData, patch, processing, recentlySuccessful } = useForm<{
        notes_initial_sidebar_visibility: boolean;
    }>({
        notes_initial_sidebar_visibility: options.notes_initial_sidebar_visibility,
    });

    return (
        <SettingsLayout title="Notes settings">
            <SettingsSection
                title="Notes settings"
                description="Update your account's notes options"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        patch(route("settings.notes.update"));
                    }}
                    className="space-y-6"
                >
                    <div className="grid gap-4">
                        <SwitchToggle
                            name="initial-sidebar-visibility"
                            value={data.notes_initial_sidebar_visibility}
                            onValue={(value) => setData("notes_initial_sidebar_visibility", value)}
                            label="Initial Sidebar Visibility"
                            tooltip="Show sidebar by default when opening single note"
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
