declare module "audio-decode" {
    interface DecodeOptions {
        context?: AudioContext;
    }

    function decode(buffer: ArrayBuffer, callback?: (err: Error, audioBuffer: ArrayBuffer) => any): void;
    function decode(buffer: ArrayBuffer, options: DecodeOptions, callback?: (err: Error, audioBuffer: ArrayBuffer) => any): void;
    function decode(buffer: ArrayBuffer, options?: DecodeOptions): Promise<ArrayBuffer>;

    export = decode;
}
