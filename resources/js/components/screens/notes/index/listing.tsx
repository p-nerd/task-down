import type { TNote } from "@/types/models";

import { Item, ItemLoading } from "./item";

export const Loading = () => {
    return (
        <div className="grid w-full grid-cols-3 gap-3 px-10 py-5">
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <ItemLoading key={index} />
                ))}
        </div>
    );
};

export const Listing = ({ notes }: { notes: TNote[] }) => {
    return (
        <div className="grid w-full grid-cols-3 gap-5 px-10 py-2">
            {notes.map((note) => (
                <Item key={note.id} note={note} />
            ))}
        </div>
    );
};
