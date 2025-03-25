import type { FormEventHandler } from "react";

import { useForm } from "@inertiajs/react";
import { useRef } from "react";

import { Messsage } from "@/components/elements/message";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Password = () => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("settings.password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <SettingsLayout title="Profile settings">
            <SettingsSection
                title="Update password"
                description="Ensure your account is using a long, random password to stay secure"
            >
                <form onSubmit={updatePassword} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">Current password</Label>

                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData("current_password", e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            placeholder="Current password"
                        />

                        <Messsage error={errors.current_password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">New password</Label>

                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="New password"
                        />

                        <Messsage error={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>

                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="Confirm password"
                        />

                        <Messsage error={errors.password_confirmation} />
                    </div>

                    <SettingsSaveButton
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                        buttonText="Save password"
                    />
                </form>
            </SettingsSection>
        </SettingsLayout>
    );
};

export default Password;
