var compressor = require("array-compressor")
var original = [1, 1, 1, 2, 2, 3]
var compressed = [{ value: 1, count: 3 }, { value: 2, count: 2 }, { value: 3, count: 1 }]

describe("JavaScript", () => {
  it("js compressed", () => {
    expect(compressor.compress(original)).toEqual(compressed)
  })

  it("js decompressed", () => {
    expect(compressor.decompress(compressed)).toEqual(original)
  })
})
