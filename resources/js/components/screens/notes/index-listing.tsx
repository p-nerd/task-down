import type { TNote } from "@/types/models";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

import { Link } from "@inertiajs/react";

const IndexListing = ({ notes }: { notes: TNote[] }) => {
    return (
        <ul className="grid w-full grid-cols-4 gap-3 px-10">
            {notes.map((n) => (
                <Link key={n.id} href={route("notes.show", n)}>
                    <li
                        className={cn(
                            "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                            "w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                        )}
                    >
                        <h3 className="mb-1 w-full font-bold">{n.name}</h3>
                        <span className="text-xs font-light">
                            {time.format.shortt(n.created_at)}
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export { IndexListing };
