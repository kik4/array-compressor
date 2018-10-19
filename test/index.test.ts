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

  it("compress(object) to equal apart objects", () => {
    const array = [{ name: "A" }, { name: "A" }]
    const expected: compressedItem[] = [{ value: { name: "A" }, count: 1 }, { value: { name: "A" }, count: 1 }]
    expect(compress(array)).toEqual(expected)
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

  it("decompress(array) to equal same objects", () => {
    const expected: compressedItem[] = [{ value: { name: "B" }, count: 2 }]
    const array = [{ name: "B" }, { name: "B" }]
    const result = decompress(expected)
    expect(result).toEqual(array)

    result[0].name = "C"
    expect(result[0] === result[1]).toBeTruthy()
  })
})
