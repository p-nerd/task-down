import type { TNote } from "@/types/models";

import { time } from "@/lib/time";

import { CreateNote } from "@/components/screens/notes/create-note";
import { Button } from "@/components/ui/button";
import { App2Layout } from "@/layouts/app2-layout";
import { LayoutListIcon } from "lucide-react";

const Notes = ({ notes }: { notes: TNote[] }) => {
    return (
        <App2Layout>
            <div className="flex h-full w-full flex-col space-y-4">
                <div className="flex justify-between">
                    <CreateNote />
                    <Button size="icon" variant="outline" className="group" onClick={() => {}}>
                        <LayoutListIcon className="h-4 w-4" />
                    </Button>
                </div>
                {notes.length === 0 ? (
                    <div className="text-muted-foreground pt-4 text-center">No Notes Yet!</div>
                ) : (
                    <ul className="grid w-full grid-cols-4 gap-3 px-10">
                        {notes.map((note) => (
                            <li
                                key={note.id}
                                className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground w-full cursor-pointer rounded-md px-2.5 py-3 transition-colors duration-75"
                            >
                                <h3 className="mb-1 w-full font-bold">{note.name}</h3>
                                <span className="text-xs font-light">
                                    {time.format.shortt(note.created_at)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </App2Layout>
    );
};

export default Notes;
