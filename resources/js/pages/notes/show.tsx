import type { TNote } from "@/types/models";

import { time } from "@/lib/time";
import { cn } from "@/lib/utils";

import { Content } from "@/components/screens/notes/content";
import { CreateNote } from "@/components/screens/notes/create-note";
import { Button } from "@/components/ui/button";
import { App2Layout } from "@/layouts/app2-layout";
import { Link } from "@inertiajs/react";
import { LayoutGridIcon, Trash2Icon } from "lucide-react";

const Notes = ({ note, notes }: { note: TNote; notes: TNote[] }) => {
    return (
        <App2Layout>
            <div className="flex h-full w-full flex-row">
                <aside className="bg-card h-[100vh+10px] w-[262px] space-y-4 overflow-auto py-2 pr-3">
                    <div className="flex justify-between">
                        <CreateNote />
                        <Button size="icon" variant="outline" className="group" onClick={() => {}}>
                            <Trash2Icon
                                className={cn(
                                    "h-4 w-4 transition-colors group-hover:text-red-500",
                                    {
                                        "animate-pulse text-red-500": false,
                                    },
                                )}
                            />
                        </Button>
                    </div>
                    {notes.length === 0 ? (
                        <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                    ) : (
                        <ul className="space-y-1">
                            {notes.map((n) => (
                                <li key={n.id}>
                                    <div
                                        className={cn(
                                            "cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75",
                                            "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                                            {
                                                "bg-primary text-primary-foreground":
                                                    n.id === note.id,
                                            },
                                        )}
                                    >
                                        <h3 className="mb-1">
                                            <div className="line-clamp-2 w-full font-bold break-words">
                                                {n.name}
                                            </div>
                                        </h3>
                                        <span className="text-xs font-light">
                                            {time.format.shortt(n.created_at)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>
                <Content note={note} onUpdate={() => {}} />
                <div className="py-2">
                    <Link href={route("notes.index")}>
                        <Button size="icon" variant="outline" className="group">
                            <LayoutGridIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </App2Layout>
    );
};

export default Notes;
