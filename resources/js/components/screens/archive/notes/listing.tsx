import { useNotesStore } from "@/states/notes";

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

export const Listing = () => {
    const { archiveNotes } = useNotesStore();

    return (
        <div className="grid w-full grid-cols-3 gap-3 px-10">
            {archiveNotes.map((note, index) => (
                <Item key={index} note={note} />
            ))}
        </div>
    );
};
