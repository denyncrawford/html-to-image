export declare type Options = {
    /**
     * Width in pixels to be applied to node before rendering.
     */
    width?: number;
    /**
     * Height in pixels to be applied to node before rendering.
     */
    height?: number;
    /**
     * A string value for the background color, any valid CSS color value.
     */
    backgroundColor?: string;
    /**
     * An object whose properties to be copied to node's style before rendering.
     */
    style?: CSSStyleDeclaration;
    /**
     * A function taking DOM node as argument. Should return `true` if passed
     * node should be included in the output. Excluding node means excluding
     * it's children as well.
     */
    filter?: (domNode: HTMLElement) => boolean;
    /**
     * A number between `0` and `1` indicating image quality (e.g. 0.92 => 92%)
     * of the JPEG image.
     */
    quality?: number;
    /**
     * Set to `true` to append the current time as a query string to URL
     * requests to enable cache busting.
     */
    cacheBust?: boolean;
    /**
     * A data URL for a placeholder image that will be used when fetching
     * an image fails. Defaults to an empty string and will render empty
     * areas for failed images.
     */
    imagePlaceholder?: string;
    /**
     * The pixel ratio of captured image. Defalut is the actual pixel ratio of
     * the device. Set 1 to use as initial-scale 1 for the image
     */
    pixelRatio?: number;
    /**
     * Option to skip the fonts download and embed.
     */
    skipFonts?: boolean;
};
export declare function toSvg(domNode: HTMLElement, options?: Options): Promise<string>;
export declare const toSvgDataURL: typeof toSvg;
export declare function toCanvas(domNode: HTMLElement, options?: Options): Promise<HTMLCanvasElement>;
export declare function toPixelData(domNode: HTMLElement, options?: Options): Promise<Uint8ClampedArray>;
export declare function toPng(domNode: HTMLElement, options?: Options): Promise<string>;
export declare function toJpeg(domNode: HTMLElement, options?: Options): Promise<string>;
export declare function toBlob(domNode: HTMLElement, options?: Options): Promise<Blob | null>;
