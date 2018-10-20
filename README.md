# array-compressor

<a href="https://circleci.com/gh/kik4/array-compressor"><img src="https://img.shields.io/circleci/project/github/kik4/array-compressor.svg" alt="Build Status"></a>
<a href="https://npmcharts.com/compare/array-compressor?minimal=true"><img src="https://img.shields.io/npm/dt/array-compressor.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/array-compressor"><img src="https://img.shields.io/npm/v/array-compressor.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/array-compressor"><img src="https://img.shields.io/npm/l/array-compressor.svg" alt="License"></a>

Compress and decompress arrays.

## Installation

```sh
npm install array-compressor --save
yarn add array-compressor
```

## Usage

### Javascript

```javascript
var compressor = require("array-compressor")
var compressed = compressor.compress([1, 1, 1, 2, 2, 3])
var decompressed = compressor.decompress(compressed)
```

```sh
# compressed
[ { value: 1, count: 3 },
  { value: 2, count: 2 },
  { value: 3, count: 1 } ]

# decompressed
[1, 1, 1, 2, 2, 3]
```

### TypeScript

```typescript
import { compress, decompress } from "array-compressor"
const compressed = compress([1, 1, 1, 2, 2, 3])
const decompressed = decompress(compressed)
```

```sh
# compressed
[ { value: 1, count: 3 },
  { value: 2, count: 2 },
  { value: 3, count: 1 } ]

# decompressed
[1, 1, 1, 2, 2, 3]
```

#### Generics

```typescript
import { compress, decompress } from "array-compressor"
const array: number[] = [1, 1, 1, 2, 2, 3] // typed
const compressed = compress<number>(array) // typed
const decompressed = decompress<number>(compressed) // typed
```

## Option

### Inject comparison function

```typescript
import { compress } from "array-compressor"
const array = [{ name: "Tom" }, { name: "Tom" }, { name: "Kerry" }]
const result1 = compress(array)
const result2 = compress(array, (src, dst) => src.name === dst.name)
```

```sh
# result1
[ { value: { name: "Tom" }, count: 1 },
  { value: { name: "Tom" }, count: 1 },
  { value: { name: "Kerry" }, count: 1 } ]

# result2
[ { value: { name: "Tom" }, count: 2 },
  { value: { name: "Kerry" }, count: 1 } ]
```

Default comparison function is `(src, dst) => src === dst`.

### Inject copy function

```typescript
import { decompress } from "array-compressor"
const compressed = [{ value: { name: "Tom" }, count: 2 }, { value: { name: "Kerry" }, count: 1 }]
const result1 = decompress(compressed)
const result2 = decompress(compressed, src => Object.assign({}, src))
```

```typescript
result1[0] === result1[1] // true
result2[0] === result2[1] // false
```

Default copy function is `(src) => src`.

## Test

```sh
npm run test
```
