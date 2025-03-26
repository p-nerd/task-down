import type { TViewMode } from "@/states/images";
import type { TSharedData } from "@/types";

import { useForm, usePage } from "@inertiajs/react";

import { RadioOptions } from "@/components/inputs/radio-options";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";

const ImagesSettings = () => {
    const options = usePage<TSharedData>().props.auth.options;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<{
        images_initial_view_mode: TViewMode;
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
                        <RadioOptions
                            name="initial-view-mode"
                            value={data.images_initial_view_mode as string}
                            onValue={(value) =>
                                setData("images_initial_view_mode", value as TViewMode)
                            }
                            options={[
                                { label: "Grid View", value: "grid" },
                                { label: "List View", value: "list" },
                            ]}
                            label="Initial View Mode"
                            tooltip="Select the default display mode when viewing images"
                            error={errors.images_initial_view_mode}
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

export default ImagesSettings;
