# array-compressor

returns compressed array

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

## Test

```sh
npm run test
```
