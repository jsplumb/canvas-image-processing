import {ATTRIBUTE_CROSS_ORIGIN, EVENT_LOAD, TAG_CANVAS, TWO_D, VALUE_ANONYMOUS} from "./definitions"

/**
 * Reads an image into a file. You might use this in conjunction with a browser dialog that opens a file,
 * or in response to a natice drag/drop event.
 * @param file
 */
export async function readImageFromFile(file:File):Promise<HTMLImageElement> {
    const reader = new FileReader()
    const img = new Image()
    return new Promise(function(resolve, reject) {
        reader.onload=(function(aImg){
            return function(e) {
                aImg.onload = function(){
                    resolve(aImg)
                }

                aImg.src = e.target.result as string

            }
        })(img)
        reader.readAsDataURL(file)
    })
}

/**
 * Gets an image as a data url.
 * @param img
 */
export function imageToDataURL(img:HTMLImageElement):string {
    const canvas = document.createElement(TAG_CANVAS) as HTMLCanvasElement
    canvas.width = img.width
    canvas.height = img.height
    img.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS);
    canvas.getContext(TWO_D).drawImage(img, 0, 0)
    return canvas.toDataURL()
}

/**
 * Converts an image uri to a data uri. If the given image resides on the network and the appropriate cross
 * origin headers are not supported, this method will fail.
 *
 * @param URI URI to load and convert to a data URI. It may already be a data URI.
 */
export async function imageURIToDataURL(URI:string):Promise<string> {
    return new Promise(function(resolve, reject) {
        if (URI == null) {
            return reject()
        }
        const canvas = document.createElement(TAG_CANVAS),
            context = canvas.getContext(TWO_D),
            image = new Image()

        image.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS)

        image.addEventListener(EVENT_LOAD, function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL())
        }, false)

        image.src = URI
    });
}

/**
 * Creates an Image from a URI.
 * @param URI Either a data:... URI or the location of an image somewhere on the network.
 * @return
 */
export async function imageURLToImage(URI:string):Promise<HTMLImageElement> {
    return new Promise(function(resolve, reject) {
        if (URI == null) {
            reject();
        } else {

            const image = new Image()

            image.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS);
            image.addEventListener('load', function() {
                resolve(image)
            }, false)

            image.src = URI
        }
    });
}
