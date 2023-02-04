# Flake ID Generator
Generates BigInt IDs as strings, in the style of Twitter Snowflake. The ID is made up of a timestamp section ( a custom epoch from Jan 1 2020 ) a node id section, and lastly a series of locally collision-safe ranomized section.

## Reasoning

Flake IDs are outperform other types because they are:
- pre-generated: avoiding DB round-trips and returning statements
- numerical: for faster indexing than String IDs and UUIDs
- replica-friendly: non-clashing based on node ids
- randomized: for obscurity and basic security
- custom-epoch: for generator longevity

## Simple Usage

```ts
import { generate } from "@aarock/flake"
const id = generate()
```

## Advanced Usage

```ts
import Flake from "@aarock/flake"
/** 
 * @param mid
 * a machine ID unique to the current replica
 */
const flake = new Flake( 1 )
const stringId:string = flake.generate()
const bigIntId:BigInt = flake.generateRaw()
```

OR

```ts
import { generate, generateRaw } from "@aarock/flake"
/** 
 * @param mid
 * a machine ID unique to the current replica
 */
const stringId:string = flake.generate( 2 )
/** 
 * @param mid
 * a machine ID unique to the current replica
 */
const bigIntId:BigInt = flake.generateRaw( 3 )
```

OR

```ts
import { configure } from "@aarock/flake"
/** 
 * @param mid
 * a machine ID unique to the current replica
 */
configure( 3 )
/** 
 * @remarks future invocations of generate and 
 * generateRaw will use the configured machine ID
 */
const stringId:string = flake.generate()
const bigIntId:BigInt = flake.generateRaw()
```