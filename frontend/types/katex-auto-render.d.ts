declare module "katex/contrib/auto-render" {
  interface RenderMathInElementOptions {
    delimiters?: Array<{ left: string; right: string; display?: boolean }>;
    ignoredTags?: string[];
    ignoredClasses?: string[];
    errorColor?: string;
    throwOnError?: boolean;
    strict?: boolean | string;
    trust?: boolean;
    macros?: Record<string, string>;
  }
  function renderMathInElement(elem: HTMLElement, options?: RenderMathInElementOptions): void;
  export default renderMathInElement;
}
