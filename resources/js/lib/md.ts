import DOMPurify from "dompurify";
import { micromark } from "micromark";

const md = {
    convert: (markdown: string): string => {
        const html = micromark(markdown);
        const sanitizedHtml = DOMPurify.sanitize(html);
        return sanitizedHtml;
    },
};

export { md };
