import DOMPurify from "dompurify";

import { micromark } from "micromark";
import { directive, directiveHtml } from "micromark-extension-directive";
import { frontmatter, frontmatterHtml } from "micromark-extension-frontmatter";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { mdx } from "micromark-extension-mdx";
import { mdxjs } from "micromark-extension-mdxjs";

const md = {
    convert: (markdown: string): string => {
        const html = micromark(markdown, {
            extensions: [directive(), frontmatter(), gfm(), mdx(), mdxjs()],
            htmlExtensions: [directiveHtml(), frontmatterHtml(), gfmHtml()],
        });
        const sanitizedHtml = DOMPurify.sanitize(html);
        return sanitizedHtml;
    },
};

export { md };
