import type { TEditorMode } from "@/states/notes";
import type { TSharedData } from "@/types";

import { useForm, usePage } from "@inertiajs/react";

import { RadioOptions } from "@/components/inputs/radio-options";
import { SwitchToggle } from "@/components/inputs/switch-toggle";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";

const NotesSettings = () => {
    const options = usePage<TSharedData>().props.auth.options;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<{
        notes_initial_sidebar_visibility: boolean;
        notes_initial_editor_mode: TEditorMode;
    }>({
        notes_initial_sidebar_visibility: options.notes_initial_sidebar_visibility,
        notes_initial_editor_mode: options.notes_initial_editor_mode,
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
                    <div className="space-y-4">
                        <SwitchToggle
                            name="initial-sidebar-visibility"
                            value={data.notes_initial_sidebar_visibility}
                            onValue={(value) => setData("notes_initial_sidebar_visibility", value)}
                            label="Initial Sidebar Visibility"
                            tooltip="Show sidebar by default when opening single note"
                            // error={errors.notes_initial_sidebar_visibility}
                        />
                        <RadioOptions
                            name="initial-default-editor-mode"
                            value={data.notes_initial_editor_mode as string}
                            onValue={(value) =>
                                setData("notes_initial_editor_mode", value as TEditorMode)
                            }
                            options={[
                                { label: "Rich Editor", value: "rich" as TEditorMode },
                                { label: "Markdown Editor", value: "markdown" as TEditorMode },
                            ]}
                            label="Initial Content Editor Mode"
                            tooltip="Choose which editor mode will be active by default when creating or opening notes"
                            // error={errors.notes_initial_editor_mode}
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
