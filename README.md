# canvas-image-processing

This project is a set of methods to assist with image processing in HTML canvas, written as part of the Toolkit's [Image processor starter app](https://jsplumbtoolkit.com/demonstrations/image-processor), and open sourced because we thought this stuff might perhaps be useful for others.

This library is designed to work in browsers, and currently only on the main thread (ie. not in WebWorkers), but when we get a moment we'll release a v2 of this that can be used inside a WebWorker.
 
The library offers a range of filtering and transform functions, as well as a set of methods for getting images into and out of a canvas.  In this page I've just dumped the typescript definition files - for a full discussion of the capabilities of the library, have a look at [this post on our blog](https://jsplumbtoolkit.com/blog/2023/11/19/image-processing-with-canvas).

## Installation

```bash
npm i @jsplumb/cavas-image-processing
```
 

## Filters

```javascript
/**
 * Invert the colors in an image.
 * @param image Image to invert
 * @param amount Amount to invert by, a number between 0 and 100. 100 is the default, which means to apply the inversion fully.
 */
export declare const filterInvert: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Apply a sepia filter to an image.
 * @param image Image to invert
 * @param amount Amount of sepia to apply. A value between 0 and 100, defaults to 100.
 */
export declare const filterSepia: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Apply a grayscale filter to an image (desaturates the image)
 * @param image Image to invert
 * @param amount Amount of desaturation, a value between 0 and 100. 100 is the default, and means full desaturation.
 */
export declare const filterGrayScale: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Apply saturation to an image.
 * @param image Image to invert
 * @param amount Amount of saturation, a value with a minimum of 0 but no specific upper limit. For values between 0 and 100,
 * the saturate filter is effectively the inverse of the grayscale filter. But the saturate filter supports values greater than 100,
 * allowing you to over-saturate an image. The default value is 50.
 */
export declare const filterSaturate: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Adjust the opacity of an image.
 * @param image Image to adjust
 * @param amount Amount of opacity (expressed as a percentage), a value between 0 and 100, defaulting to 50.
 */
export declare const filterOpacity: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Apply blur to an image.
 * @param image Image to adjust
 * @param radius Radius, in pixels, of the blur. Defaults to 10.
 */
export declare const filterBlur: (image: HTMLImageElement, radius?: number) => Promise<HTMLImageElement>;

/**
 * Rotates the hue component of an image.
 * @param image Image to adjust
 * @param rotation Rotation, in degrees, to apply. Defaults to 90.
 */
export declare const filterHueRotate: (image: HTMLImageElement, rotation?: number) => Promise<HTMLImageElement>;

/**
 * Adjusts the contrast of an image.
 * @param image Image to adjust
 * @param amount Amount of contrast to apply, a value between 0 and 100. Defaults to 200.
 */
export declare const filterContrast: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Adjusts the brightness of an image.
 * @param image Image to adjust
 * @param amount Amount of brightness to apply, a value between 0 and 100. Defaults to 200.
 */
export declare const filterBrightness: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;

/**
 * Apply a tint to an image.
 * @param image Image to tint.
 * @param color Color to tint with.
 */
export declare function filterTint(image: HTMLImageElement, color: string): Promise<HTMLImageElement>;

```
---

## Transforms

```javascript
import { AXIS_X, AXIS_X_AND_Y, AXIS_Y } from "./definitions";

/**
 * Flip the given image on either the horizontal or vertical axis, or both.
 * @param img Image to flip
 * @param axis Axis to flip on.
 */
export declare function mirrorImage(img: HTMLImageElement, axis: typeof AXIS_X | typeof AXIS_Y | typeof AXIS_X_AND_Y): Promise<HTMLImageElement>;

/**
 * Apply a threshold operation to some image.
 * @param image
 * @param threshold
 * @param value
 */
export declare function imageThreshold(image: HTMLImageElement, threshold: number, value?: number): Promise<HTMLImageElement>;

/**
 * Crop a section of an image.
 * @param image Image to crop
 * @param x Start position of crop in x axis
 * @param y Start position of crop in y axis
 * @param w Width of crop
 * @param h Height of crop
 */
export declare function cropImage(image: HTMLImageElement, x: number, y: number, w: number, h: number): Promise<HTMLImageElement>;

/**
 * Overlay an image onto some oher image
 * @param image1 Base image
 * @param image2 Image to overlay.
 * @param x Optional origin X for the overlay. Defaults to 0.
 * @param y Optional origin XY for the overlay. Defaults to 0.
 */
export declare function overlayImage(image1: HTMLImageElement, image2: HTMLImageElement, x?: number, y?: number): Promise<HTMLImageElement>;

/**
 * Use an image as a mask to clip some other image.
 * @param image Image to clip
 * @param mask Image to use as a mask.
 */
export declare function clipImage(image: HTMLImageElement, mask: HTMLImageElement): Promise<HTMLImageElement>;

/**
 * Blend two images with a given composite mode, the default being `multiply`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation for allowed blend modes.
 * @param image1 First image to blend - `destination` when using an applicable mode
 * @param image2 Second image to blend - `source` when using an applicable mode
 * @param blendMode Mode to use for blending. Defaults to `multiply`.
 */
export declare function blendImages(image1: HTMLImageElement, image2: HTMLImageElement, blendMode?: GlobalCompositeOperation): Promise<HTMLImageElement>;

/**
 * Resize the image to the given width and height.
 * @param image
 * @param width
 * @param height
 */
export declare function resizeImage(image: HTMLImageElement, width: number, height: number): Promise<HTMLImageElement>;


```

---

## CANVAS

```javascript
/**
 * Extracts the contents of the given canvas to an Image.
 * @param canvas
 * @param type Type of image (eg image/png, image/jpeg). Defaults to PNG.
 * @param quality When exporting JPG, this defines the quality of the output.
 */
export declare function canvasToImage(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<HTMLImageElement>;

/**
 * Sets the contents of a canvas element to the image represented by the given data URL.
 * @param canvas Canvas to draw into
 * @param dataURL Data URL to load.
 * @return a Promise that resolves to `true` once the image has been drawn into the canvas.
 */
export declare function setCanvasImageFromDataURL(canvas: HTMLCanvasElement, dataURL: string): Promise<boolean>;

/**
 * Sets an image on a given canvas, setting the width/height of the canvas and scaling the image to fit. You do not need
 * to use this method if you don't wish to scale the canvas. You can just use the canvas's `drawImage` method instead.
 * @param canvas Canvas to draw into
 * @param img Image to draw
 * @param width Optional width for canvas. If null, the image width will be used.
 * @param height Optional height for canvas. If null, the image height will be used.
 * @param bgFill Color to use as background fill, defaults to white. You'll see a background fill if your image's dimensions are
 * in a different aspect ratio that defined by the width/height properties you provide.
 * @return true if successful, false if not.
 */
export declare function setCanvasImageFromImage(canvas: HTMLCanvasElement, width: number, height: number, img: HTMLImageElement, bgFill?: string): boolean;
/**
 * Draw the given image into the given canvas, scaling the canvas so that the whole image fits.
 * @param canvas
 * @param img
 */
export declare function drawScaledImage(canvas: HTMLCanvasElement, img: HTMLImageElement): void;
/**
 * Create a canvas which is the size of the given image. Does not draw the image into it.
 * @public
 * @param img
 */
export declare function createCanvas(img: HTMLImageElement): HTMLCanvasElement;
```

---

## IO

```javascript
/**
 * Reads an image into a file. You might use this in conjunction with a browser dialog that opens a file,
 * or in response to a natice drag/drop event.
 * @param file
 */
export declare function readImageFromFile(file: File): Promise<HTMLImageElement>;
/**
 * Gets an image as a data url.
 * @param img
 */
export declare function imageToDataURL(img: HTMLImageElement): string;
/**
 * Converts an image uri to a data uri. If the given image resides on the network and the appropriate cross
 * origin headers are not supported, this method will fail.
 *
 * @param URI URI to load and convert to a data URI. It may already be a data URI.
 */
export declare function imageURIToDataURL(URI: string): Promise<string>;
/**
 * Creates an Image from a URI.
 * @param URI Either a data:... URI or the location of an image somewhere on the network.
 * @return
 */
export declare function imageURLToImage(URI: string): Promise<HTMLImageElement>;
```
