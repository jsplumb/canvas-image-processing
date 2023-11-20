
export * from './definitions'
export * from './canvas-util'
export * from './filter'
export * from './io'
export * from './transform'


// /**
//  *
//  */
// interface OffscreenCanvasType {
//     convertToBlob:(options?:{type?:string, quality?:number}) => Promise<Blob>
//     getContext(name:string, contextAttributes?:Record<string, any>):CanvasRenderingContext2D
//     transferToImageBitmap():ImageBitmap
// }
//
// declare const OffscreenCanvas:OffscreenCanvasType
//
// function isOffscreenCanvas(o:HTMLCanvasElement|OffscreenCanvasType):o is OffscreenCanvasType {
//     return (o as any).convertToBlob != null
// }

















