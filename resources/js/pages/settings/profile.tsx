import type { TSharedData } from "@/types";
import type { FormEventHandler } from "react";

import { useForm, usePage } from "@inertiajs/react";

import { HeadingSmall } from "@/components/elements/heading-small";
import { Messsage } from "@/components/elements/message";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transition } from "@headlessui/react";
import { Head, Link } from "@inertiajs/react";

import { DeleteUser } from "@/components/screens/settings/delete-user";

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
        <SettingsLayout>
            <Head title="Profile settings" />
            <div className="space-y-6">
                <HeadingSmall
                    title="Profile information"
                    description="Update your name and email address"
                />

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

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>

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
            </div>

            <DeleteUser />
        </SettingsLayout>
    );
};

export default Profile;
