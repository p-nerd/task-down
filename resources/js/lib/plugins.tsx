import type { TNote } from "@/types/models";

import {
    diffSourcePlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from "@mdxeditor/editor";

import {
    BoldItalicUnderlineToggles,
    CreateLink,
    DiffSourceToggleWrapper,
    InsertImage,
    InsertTable,
    UndoRedo,
} from "@mdxeditor/editor";

const plugins = (note: TNote) => [
    // basic
    headingsPlugin(),
    quotePlugin(),
    listsPlugin(),
    thematicBreakPlugin(),

    // links
    linkPlugin(),
    linkDialogPlugin({
        linkAutocompleteSuggestions: ["https://developershihab.com"],
    }),

    // images
    imagePlugin({
        imageUploadHandler: async (image: File) => {
            const formData = new FormData();
            formData.append("image", image);
            // send the file to your server and return
            // the URL of the uploaded image in the response
            const response = await fetch("/uploads/new", {
                method: "POST",
                body: formData,
            });
            const json = (await response.json()) as { url: string };
            return json.url;
        },
        imageAutocompleteSuggestions: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200",
        ],
    }),

    // tables
    tablePlugin(),

    // TODO code blocks

    // diff/source mode
    diffSourcePlugin({
        diffMarkdown: note.content,
        viewMode: "rich-text",
    }),

    // Markdown keyboard shortcuts
    markdownShortcutPlugin(),

    // toolbar
    toolbarPlugin({
        toolbarClassName: "my-classname",
        toolbarContents: () => (
            <>
                {/* diff/source mode */}
                <DiffSourceToggleWrapper>
                    {/* basic */}
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    {/* links */}
                    <CreateLink />
                    {/* images */}
                    <InsertImage />
                    {/* tables */}
                    <InsertTable />
                </DiffSourceToggleWrapper>
            </>
        ),
    }),
];

export { plugins };
