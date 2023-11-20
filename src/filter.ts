/**
 * Base filter function.
 * @internal
 * @param filter
 * @param qualifier
 * @param defaultValue
 * @param image
 * @param amount
 * @private
 */
import {canvasToImage, createCanvas} from "./canvas-util"
import {GLOBAL_COMPOSITE_DESTINATION_IN, GLOBAL_COMPOSITE_MULTIPLY, TAG_CANVAS, TWO_D} from "./definitions"

function _simpleFilter(filter:string, qualifier:string, defaultValue:number, image:HTMLImageElement, amount?:number):Promise<HTMLImageElement> {
    amount = amount || defaultValue

    const c1 = document.createElement(TAG_CANVAS)
    c1.width = image.naturalWidth
    c1.height = image.naturalHeight

    const ctx1 = c1.getContext("2d")
    ctx1.filter = `${filter}(${amount}${qualifier})`
    ctx1.drawImage(image, 0, 0, c1.width, c1.height)

    return canvasToImage(c1)
}

/**
 * Invert the colors in an image.
 * @param image Image to invert
 * @param amount Amount to invert by, a number between 0 and 100. 100 is the default, which means to apply the inversion fully.
 */
export const filterInvert:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "invert", "%", 100)

/**
 * Apply a sepia filter to an image.
 * @param image Image to invert
 * @param amount Amount of sepia to apply. A value between 0 and 100, defaults to 100.
 */
export const filterSepia:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "sepia", "%", 100)

/**
 * Apply a grayscale filter to an image (desaturates the image)
 * @param image Image to invert
 * @param amount Amount of desaturation, a value between 0 and 100. 100 is the default, and means full desaturation.
 */
export const filterGrayScale:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "grayscale", "%", 100)

/**
 * Apply saturation to an image.
 * @param image Image to invert
 * @param amount Amount of saturation, a value with a minimum of 0 but no specific upper limit. For values between 0 and 100,
 * the saturate filter is effectively the inverse of the grayscale filter. But the saturate filter supports values greater than 100,
 * allowing you to over-saturate an image. The default value is 50.
 */
export const filterSaturate:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "saturate", "%", 50)

/**
 * Adjust the opacity of an image.
 * @param image Image to adjust
 * @param amount Amount of opacity (expressed as a percentage), a value between 0 and 100, defaulting to 50.
 */
export const filterOpacity:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "opacity", "%", 50)

/**
 * Apply blur to an image.
 * @param image Image to adjust
 * @param radius Radius, in pixels, of the blur. Defaults to 10.
 */
export const filterBlur:(image:HTMLImageElement, radius?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "blur", "px", 10)

/**
 * Rotates the hue component of an image.
 * @param image Image to adjust
 * @param rotation Rotation, in degrees, to apply. Defaults to 90.
 */
export const filterHueRotate:(image:HTMLImageElement, rotation?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "hue-rotate", "deg", 90)

/**
 * Adjusts the contrast of an image.
 * @param image Image to adjust
 * @param amount Amount of contrast to apply, a value between 0 and 100. Defaults to 200.
 */
export const filterContrast:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "contrast", "%", 200)

/**
 * Adjusts the brightness of an image.
 * @param image Image to adjust
 * @param amount Amount of brightness to apply, a value between 0 and 100. Defaults to 200.
 */
export const filterBrightness:(image:HTMLImageElement, amount?:number)=>Promise<HTMLImageElement> = _simpleFilter.bind(null, "brightness", "%", 200)

/**
 * Apply a tint to an image.
 * @param image Image to tint.
 * @param color Color to tint with.
 */
export async function filterTint(image:HTMLImageElement, color:string):Promise<HTMLImageElement> {

    const fg = createCanvas(image)
    const fgx = fg.getContext(TWO_D)

    fgx.drawImage(image, 0, 0)

    fgx.fillStyle = color
    fgx.globalCompositeOperation = GLOBAL_COMPOSITE_MULTIPLY
    fgx.fillRect(0, 0, fg.width, fg.height)

    fgx.globalAlpha = 0.5
    fgx.globalCompositeOperation = GLOBAL_COMPOSITE_DESTINATION_IN
    fgx.drawImage(image, 0, 0)

    return canvasToImage(fg)

}
