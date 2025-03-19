import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Link } from "@inertiajs/react";
import { CheckSquareIcon, NotebookIcon, TimerIcon } from "lucide-react";

type TItem = {
    label: string;
    route: string;
    icon: ReactNode;
};

const items: TItem[] = [
    { label: "Notes", route: "notes.index", icon: <NotebookIcon className="h-4 w-4" /> },
    { label: "Todos", route: "todos.index", icon: <CheckSquareIcon className="h-4 w-4" /> },
    { label: "Pomodoro", route: "pomodoro.index", icon: <TimerIcon className="h-4 w-4" /> },
];

const Item = ({ item }: { item: TItem }) => {
    const active = route().current(item.route);

    return (
        <Link
            href={route(item.route)}
            className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors",
                active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary",
            )}
        >
            {item.icon}
            {item.label}
        </Link>
    );
};

export const Navigation = () => {
    return (
        <div className="flex flex-1 overflow-hidden">
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </div>
    );
};
