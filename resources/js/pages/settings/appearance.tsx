import type { TAppearance } from "@/hooks/use-appearance";
import type { LucideIcon } from "lucide-react";

import { useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";

import { HeadingSmall } from "@/components/elements/heading-small";
import { SettingsLayout } from "@/layouts/settings-layout";
import { Head } from "@inertiajs/react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

const tabs: { value: TAppearance; icon: LucideIcon; label: string }[] = [
    { value: "light", icon: SunIcon, label: "Light" },
    { value: "dark", icon: MoonIcon, label: "Dark" },
    { value: "system", icon: MonitorIcon, label: "System" },
];

const Appearance = () => {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <SettingsLayout>
            <Head title="Appearance settings" />
            <div className="space-y-6">
                <HeadingSmall
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />
                <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                    {tabs.map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            onClick={() => updateAppearance(value)}
                            className={cn(
                                "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
                                appearance === value
                                    ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
                                    : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60",
                            )}
                        >
                            <Icon className="-ml-1 h-4 w-4" />
                            <span className="ml-1.5 text-sm">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </SettingsLayout>
    );
};

export default Appearance;
