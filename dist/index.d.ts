export default class Flake {
    private nodeId;
    private sequence;
    private lastTime;
    private timeOffset;
    constructor(nodeId?: number);
    generateRaw(): BigInt;
    generate(): string;
}
export declare function configure(mid: number): void;
export declare function generate(mid?: number): string;
export declare function generateRaw(mid?: number): BigInt;
