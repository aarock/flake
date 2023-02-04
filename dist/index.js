export default class Flake {
    nodeId = 1;
    sequence = 0;
    lastTime = 0;
    timeOffset = 1_577_836_800;
    constructor(nodeId = 0) {
        this.nodeId = nodeId % 1023;
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
export function configure(mid) {
    if (!defaultFlake)
        defaultFlake = new Flake(mid);
}
export function generate(mid) {
    if (!defaultFlake)
        defaultFlake = new Flake(mid);
    return defaultFlake.generate();
}
export function generateRaw(mid) {
    if (!defaultFlake)
        defaultFlake = new Flake(mid);
    return defaultFlake.generateRaw();
}
//# sourceMappingURL=index.js.map