import { SettingsLayout } from "@/layouts/settings-layout";
import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";

const Appearance = () => {
    return (
        <SettingsLayout>
            <Head title="Appearance settings" />
            <div className="space-y-6">
                <HeadingSmall
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    );
};

export default Appearance;
