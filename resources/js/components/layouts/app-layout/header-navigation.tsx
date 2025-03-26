import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Link } from "@inertiajs/react";
import { CheckSquareIcon, NotebookIcon, TimerIcon } from "lucide-react";

type TItem = {
    label: string;
    route: string;
    base: string;
    icon: LucideIcon;
};

const items: TItem[] = [
    {
        label: "Notes",
        route: "notes.index",
        base: "notes",
        icon: NotebookIcon,
    },
    {
        label: "Todos",
        route: "todos.index",
        base: "todos",
        icon: CheckSquareIcon,
    },
    {
        label: "Pomodoro",
        route: "pomodoro.index",
        base: "pomodoro",
        icon: TimerIcon,
    },
];

const Item = ({ item }: { item: TItem }) => {
    const href = window.location.href;

    const active = href.includes(item.base) && !href.includes("/settings");

    const Icon = item.icon;

    return (
        <Link
            key={item.route}
            href={route(item.route)}
            className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors",
                active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary",
            )}
        >
            <Icon className="size-4" />
            {item.label}
        </Link>
    );
};

const HeaderNavigation = () => {
    return (
        <div className="flex flex-1 overflow-hidden">
            {items.map((item, index) => (
                <Item item={item} key={index} />
            ))}
        </div>
    );
};

export { HeaderNavigation };
