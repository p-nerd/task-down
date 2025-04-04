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

import type { TEditorMode } from "@/states/notes";
import type { TNote } from "@/types/models";

import { toolbar } from "@/components/elements/toolbar";
import { imageUploadHandler } from "./api";

import { AdmonitionDirectiveDescriptor } from "@mdxeditor/editor";

const codeBlockLanguages = {
    js: "JavaScript",
    css: "CSS",
    txt: "text",
    tsx: "TypeScript",
};

export const plugins = (note: TNote, editorMode: TEditorMode | null) => [
    toolbarPlugin({ toolbarContents: () => toolbar() }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({ imageUploadHandler }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
    codeMirrorPlugin({ codeBlockLanguages }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({
        viewMode: editorMode === "markdown" ? "source" : "rich-text",
        diffMarkdown: note.content,
        readOnlyDiff: true,
    }),
    markdownShortcutPlugin(),
];
