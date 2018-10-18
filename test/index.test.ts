import { compress, compressedItem, decompress } from "../src"

describe("compress", () => {
  it("compress(array) to equal expected", () => {
    const array = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4]
    const expected: compressedItem[] = [
      { value: 1, count: 3 },
      { value: 2, count: 2 },
      { value: 3, count: 1 },
      { value: 4, count: 4 },
    ]
    expect(compress(array)).toEqual(expected)
  })
  it("compress(null) to throw error", () => {
    expect(() => {
      compress(null)
    }).toThrow()
  })
})

describe("decompress", () => {
  it("decompress(array) to equal expected", () => {
    const expected: compressedItem[] = [
      { value: 1, count: 3 },
      { value: 2, count: 2 },
      { value: 3, count: 1 },
      { value: 4, count: 4 },
    ]
    const array = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4]
    expect(decompress(expected)).toEqual(array)
  })
  it("decompress(null) to throw error", () => {
    expect(() => {
      decompress(null)
    }).toThrow()
  })
})
