import type { TSharedData } from "@/types";
import type { FormEventHandler } from "react";

import { useForm, usePage } from "@inertiajs/react";

import { Messsage } from "@/components/elements/message";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";

import { DeleteUser } from "@/components/screens/settings/delete-user";
import { SettingsSaveButton } from "@/components/screens/settings/settings-save-button";
import { SettingsSection } from "@/components/screens/settings/settings-section";

const Profile = ({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) => {
    const { auth } = usePage<TSharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<
        Required<{
            name: string;
            email: string;
        }>
    >({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("settings.profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <SettingsLayout title="Profile settings">
            <SettingsSection
                title="Profile information"
                description="Update your name and email address"
            >
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Full name"
                        />

                        <Messsage className="mt-2" error={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>

                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Email address"
                        />

                        <Messsage className="mt-2" error={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                Your email address is unverified.{" "}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    Click here to resend the verification email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <SettingsSaveButton
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                    />
                </form>
            </SettingsSection>
            <DeleteUser />
        </SettingsLayout>
    );
};

export default Profile;
