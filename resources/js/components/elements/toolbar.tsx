import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    ChangeAdmonitionType,
    ChangeCodeMirrorLanguage,
    CodeToggle,
    ConditionalContents,
    CreateLink,
    DiffSourceToggleWrapper,
    InsertAdmonition,
    InsertCodeBlock,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    ListsToggle,
    StrikeThroughSupSubToggles,
    UndoRedo,
} from "@mdxeditor/editor";

import type { DirectiveNode, EditorInFocus } from "@mdxeditor/editor";

import { Separator } from "@radix-ui/react-separator";

const whenInAdmonition = (editorInFocus: EditorInFocus | null) => {
    const node = editorInFocus?.rootNode;
    if (!node || node.getType() !== "directive") {
        return false;
    }

    return ["note", "tip", "danger", "info", "caution"].includes(
        (node as DirectiveNode).getMdastNode().name,
    );
};

const Toolbar = () => (
    <DiffSourceToggleWrapper>
        <ConditionalContents
            options={[
                {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                    fallback: () => (
                        <>
                            <UndoRedo />
                            <Separator />

                            <BoldItalicUnderlineToggles />
                            <Separator />

                            <StrikeThroughSupSubToggles />
                            <Separator />

                            <ListsToggle />
                            <Separator />

                            <ConditionalContents
                                options={[
                                    {
                                        when: whenInAdmonition,
                                        contents: () => <ChangeAdmonitionType />,
                                    },
                                    { fallback: () => <BlockTypeSelect /> },
                                ]}
                            />
                            <Separator />

                            <CreateLink />
                            <InsertImage />
                            <Separator />

                            <InsertTable />
                            <InsertThematicBreak />
                            <Separator />

                            <InsertCodeBlock />
                            <CodeToggle />

                            <ConditionalContents
                                options={[
                                    {
                                        when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                                        contents: () => (
                                            <>
                                                <Separator />
                                                <InsertAdmonition />
                                            </>
                                        ),
                                    },
                                ]}
                            />
                            <Separator />
                        </>
                    ),
                },
            ]}
        />
    </DiffSourceToggleWrapper>
);

export const toolbar = () => {
    return <Toolbar />;
};
