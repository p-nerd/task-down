import { marked } from "marked";
import { Component, createEffect, createSignal } from "solid-js";

import DOMPurify from "dompurify";

interface MarkdownEditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    className?: string;
    minHeight?: number;
}

interface TextSelection {
    start: number;
    end: number;
}

type MarkdownFormatFunction = (selection: string) => {
    prefix: string;
    suffix?: string;
};

const formatters: Record<string, MarkdownFormatFunction> = {
    bold: () => ({ prefix: "**", suffix: "**" }),
    italic: () => ({ prefix: "_", suffix: "_" }),
    code: () => ({ prefix: "`", suffix: "`" }),
    link: () => ({ prefix: "[", suffix: "](url)" }),
    h1: () => ({ prefix: "# " }),
    h2: () => ({ prefix: "## " }),
    h3: () => ({ prefix: "### " }),
    blockquote: () => ({ prefix: "> " }),
    unorderedList: () => ({ prefix: "- " }),
    orderedList: () => ({ prefix: "1. " }),
};

export const Editor: Component<MarkdownEditorProps> = props => {
    const [markdown, setMarkdown] = createSignal<string>(props.initialValue || "");
    const [preview, setPreview] = createSignal<string>("");

    let textareaRef!: HTMLTextAreaElement;

    createEffect(() => {
        const html = DOMPurify.sanitize(marked(markdown()) as string);
        setPreview(html);
        props.onChange?.(markdown());
    });

    const insertMarkdown = (format: MarkdownFormatFunction): void => {
        const start = textareaRef.selectionStart;
        const end = textareaRef.selectionEnd;
        const text = markdown();
        const selection = text.substring(start, end);

        const { prefix, suffix = "" } = format(selection);
        const before = text.substring(0, start);
        const after = text.substring(end);

        const newText = `${before}${prefix}${selection}${suffix}${after}`;
        setMarkdown(newText);

        // Reset cursor position
        setTimeout(() => {
            textareaRef.focus();
            textareaRef.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const handlePaste = async (e: ClipboardEvent): Promise<void> => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.indexOf("image") === 0) {
                e.preventDefault();
                const file = item.getAsFile();
                if (!file) continue;

                const reader = new FileReader();
                reader.onload = event => {
                    const imageUrl = event.target?.result;
                    if (typeof imageUrl === "string") {
                        insertMarkdown(() => ({
                            prefix: "![",
                            suffix: `](${imageUrl})`,
                        }));
                    }
                };
                reader.readAsDataURL(file);
                break;
            }
        }
    };

    const handleDrop = (e: DragEvent): void => {
        e.preventDefault();
        const files = e.dataTransfer?.files;

        if (files?.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = event => {
                    const imageUrl = event.target?.result;
                    if (typeof imageUrl === "string") {
                        insertMarkdown(() => ({
                            prefix: "![",
                            suffix: `](${imageUrl})`,
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const renderToolbarButton = (
        label: string,
        title: string,
        formatter: MarkdownFormatFunction,
    ): JSX.Element => (
        <button
            onClick={() => insertMarkdown(formatter)}
            title={title}
            class="focus:ring-opacity-50 rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="button"
        >
            {label}
        </button>
    );

    return (
        <div class={`overflow-hidden rounded-lg border border-gray-200 ${props.className || ""}`}>
            <div class="flex gap-1 border-b border-gray-200 bg-gray-50 p-2">
                {renderToolbarButton("B", "Bold", formatters.bold)}
                {renderToolbarButton("I", "Italic", formatters.italic)}
                {renderToolbarButton("<>", "Code", formatters.code)}
                {renderToolbarButton("🔗", "Link", formatters.link)}
                {renderToolbarButton("H1", "Heading 1", formatters.h1)}
                {renderToolbarButton("H2", "Heading 2", formatters.h2)}
                {renderToolbarButton("H3", "Heading 3", formatters.h3)}
                {renderToolbarButton("❝", "Blockquote", formatters.blockquote)}
                {renderToolbarButton("•", "Bullet List", formatters.unorderedList)}
                {renderToolbarButton("1.", "Numbered List", formatters.orderedList)}
            </div>

            <div
                class="grid grid-cols-2 gap-4 p-4"
                style={`min-height: ${props.minHeight || 400}px`}
            >
                <textarea
                    ref={textareaRef!}
                    value={markdown()}
                    onInput={e => setMarkdown(e.currentTarget.value)}
                    onPaste={handlePaste}
                    onDrop={handleDrop}
                    placeholder="Write your markdown here..."
                    class="focus:ring-opacity-50 h-full w-full resize-y rounded border border-gray-200 p-2 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <div
                    class="prose prose-sm max-w-none overflow-y-auto rounded border border-gray-200 p-2"
                    innerHTML={preview()}
                />
            </div>
        </div>
    );
};
