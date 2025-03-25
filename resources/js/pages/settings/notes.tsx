import { useForm } from "@inertiajs/react";

import { HeadingSmall } from "@/components/elements/heading-small";
import { SettingsLayout } from "@/components/layouts/settings-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Transition } from "@headlessui/react";
import { Head } from "@inertiajs/react";

const NotesSettings = ({ initial_sidebar_visibility }: { initial_sidebar_visibility: boolean }) => {
    const { data, setData, patch, processing, recentlySuccessful } = useForm<{
        initial_sidebar_visibility: boolean;
    }>({
        initial_sidebar_visibility,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch("/settings/notes", {
            onSuccess: () => {
                // Success handling if needed
            },
        });
    };

    return (
        <SettingsLayout>
            <Head title="Notes settings" />
            <div className="space-y-6">
                <HeadingSmall
                    title="Notes options"
                    description="Update your account's notes settings"
                />
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
                            <Label htmlFor="sidebar-visibility">Initial Sidebar Visibility</Label>
                            <p className="text-xs text-neutral-500">
                                Show sidebar by default when opening single note
                            </p>
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
            </div>
        </SettingsLayout>
    );
};

export default NotesSettings;
