
export default class Flake {
	private nodeId: number = 1
	private sequence: number = 0
	private lastTime: number = 0
	private timeOffset: number = 1_577_836_800 // 1970 => 2020

	constructor ( nodeId: number = 0 ) {
		this.nodeId = nodeId % 1023
	}

	generateRaw (): BigInt {
		const nowTime = Date.now()
		const genTime = ( nowTime - this.timeOffset ).toString( 2 )

		this.sequence = 0

		// set sequence number
		// this prevents multiple IDs from being generated in 1ms
		if ( this.lastTime === nowTime ) {
			this.sequence += 1
			if ( this.sequence > 4095 ) {
				this.sequence = 0
				// wait until time has incremented by a millisecond
				while ( Date.now() <= nowTime ) { }
			}
		}

		this.lastTime = nowTime

		// make sure sequence length will be constant
		const genSequence = this.sequence.toString( 2 ).padStart( 12, "0" )
		const genNode = this.nodeId.toString( 2 ).padStart( 10, "0" )
		const rawId = genTime + genNode + genSequence

		let id = ""
		for ( let i = rawId.length; i > 0; i -= 4 ) {
			id = parseInt( rawId.substring( i - 4, i ), 2 ).toString( 16 ) + id
		}

		return BigInt( `0x${ id }` )
	}

	generate (): string {
		return `${ this.generateRaw() }`
	}

}

var defaultFlake: Flake

export function configure ( mid: number ) {
	if ( !defaultFlake ) defaultFlake = new Flake( mid )
}

export function generate ( mid?: number ) {
	if ( !defaultFlake ) defaultFlake = new Flake( mid )
	return defaultFlake.generate()
}

export function generateRaw ( mid?: number ) {
	if ( !defaultFlake ) defaultFlake = new Flake( mid )
	return defaultFlake.generateRaw()
}