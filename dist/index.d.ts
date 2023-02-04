export interface Options {
    nodeId?: number;
    timeOffset?: number;
}
export default class Flake {
    private sequence;
    private lastTime;
    private nodeId;
    private timeOffset;
    constructor(options?: Options);
    generateRaw(): BigInt;
    generate(): string;
}
export declare function configure(options: Options): void;
export declare function generate(options?: Options): string;
export declare function generateRaw(options?: Options): BigInt;
