import type { TNote } from "@/types/models";

import { time } from "@/lib/time";

import { Button } from "@/components/ui/button";
import { App2Layout } from "@/layouts/app2-layout";
import { Link } from "@inertiajs/react";
import { LayoutListIcon, NotebookPenIcon } from "lucide-react";

const Notes = ({ notes }: { notes: TNote[] }) => {
    return (
        <App2Layout className="flex h-full w-full flex-col space-y-4">
            <div className="flex justify-between pt-6">
                <Button size="icon" variant="outline" className="group">
                    <NotebookPenIcon className="h-4 w-4 transition-colors" />
                </Button>
                <Link href={route("notes.show", notes[0])}>
                    <Button size="icon" variant="outline" className="group" onClick={() => {}}>
                        <LayoutListIcon className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            {notes.length === 0 ? (
                <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
            ) : (
                <ul className="grid w-full grid-cols-4 gap-3 px-10">
                    {notes.map((n) => (
                        <Link key={n.id} href={route("notes.show", n)}>
                            <li className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75">
                                <h3 className="mb-1 w-full font-bold">{n.name}</h3>
                                <span className="text-xs font-light">
                                    {time.format.shortt(n.created_at)}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </App2Layout>
    );
};

export default Notes;
