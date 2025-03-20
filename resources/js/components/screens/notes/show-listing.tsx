import type { TNote } from "@/types/models";

import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

import { Link } from "@inertiajs/react";

const ShowListing = ({ notes, note }: { notes: TNote[]; note: TNote }) => {
    const scrollIntoViewRef = useScrollIntoView();

    return (
        <ul className="flex flex-col space-y-2">
            {notes.map((n) => (
                <Link key={n.id} href={route("notes.show", n)} preserveState={true}>
                    <li
                        ref={n.id === note.id ? scrollIntoViewRef : null}
                        className={cn(
                            "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                            "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                            {
                                "bg-primary text-primary-foreground": n.id === note.id,
                            },
                        )}
                    >
                        <h3 className="mb-1 w-full text-base font-bold">{n.name}</h3>
                        <span className="text-xs font-light">
                            {time.format.shortt(n.created_at)}
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export { ShowListing };
