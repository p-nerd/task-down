import {
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    directivesPlugin,
    frontmatterPlugin,
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

import type { TNote } from "@/types/models";

import { toolbar } from "@/components/elements/toolbar";

import { AdmonitionDirectiveDescriptor } from "@mdxeditor/editor";

const codeBlockLanguages = {
    js: "JavaScript",
    css: "CSS",
    txt: "text",
    tsx: "TypeScript",
};

export const plugins = (note: TNote) => [
    toolbarPlugin({ toolbarContents: () => toolbar() }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({ imageUploadHandler: async () => "/sample-image.png" }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
    codeMirrorPlugin({ codeBlockLanguages }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: note.content, readOnlyDiff: true }),
    markdownShortcutPlugin(),
];
