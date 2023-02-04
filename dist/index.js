export default class Flake {
    sequence = 0;
    lastTime = 0;
    nodeId = 1;
    timeOffset = 1_577_836_800;
    constructor(options = {}) {
        this.nodeId = (options.nodeId || this.nodeId) % 1023;
        this.timeOffset = options.timeOffset || this.timeOffset;
    }
    generateRaw() {
        const nowTime = Date.now();
        const genTime = (nowTime - this.timeOffset).toString(2);
        this.sequence = 0;
        if (this.lastTime === nowTime) {
            this.sequence += 1;
            if (this.sequence > 4095) {
                this.sequence = 0;
                while (Date.now() <= nowTime) { }
            }
        }
        this.lastTime = nowTime;
        const genSequence = this.sequence.toString(2).padStart(12, "0");
        const genNode = this.nodeId.toString(2).padStart(10, "0");
        const rawId = genTime + genNode + genSequence;
        let id = "";
        for (let i = rawId.length; i > 0; i -= 4) {
            id = parseInt(rawId.substring(i - 4, i), 2).toString(16) + id;
        }
        return BigInt(`0x${id}`);
    }
    generate() {
        return `${this.generateRaw()}`;
    }
}
var defaultFlake;
export function configure(options) {
    if (!defaultFlake)
        defaultFlake = new Flake(options);
}
export function generate(options) {
    if (!defaultFlake)
        defaultFlake = new Flake(options);
    return defaultFlake.generate();
}
export function generateRaw(options) {
    if (!defaultFlake)
        defaultFlake = new Flake(options);
    return defaultFlake.generateRaw();
}
//# sourceMappingURL=index.js.map