'use client';

/**
 * sanitizeHtml — single choke-point for every dangerouslySetInnerHTML in
 * the app. KaTeX output, corpus stems, LLM tutor replies, and OCR text all
 * pass through here.
 *
 * Allowed: text formatting, math markup (KaTeX spans use class/style),
 * links (forced target=_blank rel=noopener), lists, tables.
 * Stripped: <script>, <iframe>, event handlers (onerror/onclick), srcdoc,
 * javascript: URIs, <form>/<input>, <object>/<embed>, <svg> with scripts.
 */
import DOMPurify, { type Config } from 'dompurify';

const CONFIG: Config = {
    ALLOWED_TAGS: [
        'a', 'abbr', 'b', 'br', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn',
        'div', 'dl', 'dt', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4',
        'h5', 'h6', 'hr', 'i', 'img', 'ins', 'kbd', 'li', 'mark', 'ol', 'p',
        'pre', 's', 'small', 'span', 'strong', 'sub', 'sup', 'table', 'tbody',
        'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul',
        // KaTeX renders through annotation/mrow/semantics — allow the math tags
        'math', 'semantics', 'annotation', 'mrow', 'msqrt', 'mfrac', 'msup',
        'msub', 'msubsup', 'mi', 'mn', 'mo', 'mtext', 'mspace', 'mover',
        'munder', 'munderover', 'mtable', 'mtr', 'mtd', 'mstyle', 'mphantom',
        'menclose', 'ms',
    ],
    ALLOWED_ATTR: [
        'class', 'id', 'style', 'title', 'aria-hidden', 'aria-label', 'role',
        'href', 'target', 'rel', 'src', 'alt', 'width', 'height', 'colspan',
        'rowspan', 'scope', 'align', 'valign', 'data-*',
        // KaTeX internals
        'xmlns', 'encoding', 'lspace', 'rspace', 'minsize', 'maxsize',
        'mathvariant', 'display', 'stretchy', 'depth', 'sep',
    ],
    ALLOWED_URI_REGEXP: /^(?:https?|mailto|tel|data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,)/i,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'select', 'textarea', 'audio', 'video', 'base', 'meta', 'link'],
    FORBID_ATTR: ['srcdoc', 'formaction', 'xlink:href'],
    RETURN_TRUSTED_TYPE: false,
};

export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty, CONFIG) as string;
}
