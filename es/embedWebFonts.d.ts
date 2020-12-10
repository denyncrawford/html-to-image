import { Options } from './index';
export declare function parseWebFontRules(clonedNode: HTMLElement): Promise<CSSRule[]>;
export declare function embedWebFonts(clonedNode: HTMLElement, options: Options): Promise<HTMLElement>;
export declare function getCssRules(styleSheets: CSSStyleSheet[]): Promise<CSSStyleRule[]>;
