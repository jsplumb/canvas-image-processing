/**
 * Exports the given canvas to an image.
 * @param canvas
 * @param options
 */
import {TAG_CANVAS, TWO_D} from "./definitions"

/**
 * Extracts the contents of the given canvas to an Image.
 * @param canvas
 * @param type Type of image (eg image/png, image/jpeg). Defaults to PNG.
 * @param quality When exporting JPG, this defines the quality of the output.
 */
export async function canvasToImage(canvas:HTMLCanvasElement, type?:string, quality?:number):Promise<HTMLImageElement> {

    return new Promise(function(resolve, reject) {

        const d = canvas.toDataURL(type, quality)
        const oo = new Image()
        oo.onload = function () {
            resolve(oo)
        }

        oo.src = d
    })
}

/**
 * Sets the contents of a canvas element to the image represented by the given data URL.
 * @param canvas Canvas to draw into
 * @param dataURL Data URL to load.
 * @return a Promise that resolves to `true` once the image has been drawn into the canvas.
 */
export function setCanvasImageFromDataURL(canvas:HTMLCanvasElement, dataURL:string):Promise<boolean> {

    return new Promise(function(resolve, reject) {
        const img = new Image()
        img.onload = function() {
            const ctx = canvas.getContext(TWO_D)
            ctx.save()
            ctx.drawImage(img, 0, 0)
            ctx.restore()
            resolve(true)
        }
        img.src = dataURL
    })
}

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
export function setCanvasImageFromImage(canvas:HTMLCanvasElement, width:number, height:number, img:HTMLImageElement, bgFill?:string):boolean {

    let success = false
    const ctx = canvas.getContext("2d")
    ctx.save()

    if (img != null) {

        ctx.fillStyle = bgFill || "white"
        ctx.fillRect(0,0,width,height)

        const scaleX = width / img.width
        const scaleY = height / img.height
        const minScale = Math.min(scaleX, scaleY)

        ctx.scale(minScale, minScale)
        const y = (height - (minScale * img.height)) / 2
        const x = (width - (minScale * img.width)) / 2

        ctx.drawImage(img, x / minScale, y / minScale);

        success = true
    }

    ctx.restore()

    return success
}

/**
 * Draw the given image into the given canvas, scaling the canvas so that the whole image fits.
 * @param canvas
 * @param img
 */
export function drawScaledImage(canvas:HTMLCanvasElement, img:HTMLImageElement):void {
    const ctx = canvas.getContext("2d")
    const scaleX = canvas.width / img.width
    const scaleY = canvas.height / img.height
    const minScale = Math.min(scaleX, scaleY)
    ctx.save()
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    ctx.scale(minScale, minScale)
    const y = (canvas.height - (minScale * img.height)) / 2
    const x = (canvas.width - (minScale * img.width)) / 2

    ctx.drawImage(img, x/minScale, y/minScale);
    ctx.restore()
}


/**
 * Create a canvas which is the size of the given image. Does not draw the image into it.
 * @public
 * @param img
 */
export function createCanvas(img:HTMLImageElement):HTMLCanvasElement {

    const w = img ? img.naturalWidth : 600,
        h = img ? img.naturalHeight : 600,
        fg = document.createElement(TAG_CANVAS)

    fg.width = w
    fg.height = h

    return fg
}
