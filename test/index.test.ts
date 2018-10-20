import { compress, compressedItem, decompress, compareFunction, copyFunction } from "../src"

const original = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4]
const compressed: compressedItem[] = [
  { value: 1, count: 3 },
  { value: 2, count: 2 },
  { value: 3, count: 1 },
  { value: 4, count: 4 },
]

type testObj = { name: string }
const originalObj: testObj[] = [{ name: "A" }, { name: "A" }, { name: "B" }]
const compressedObj: compressedItem[] = [{ value: { name: "A" }, count: 2 }, { value: { name: "B" }, count: 1 }]
const compareObj: compareFunction<testObj> = (src, dst) => src.name === dst.name
const copyObj: copyFunction<testObj> = src => Object.assign({}, src)

describe("compress", () => {
  it("compress(array) to equal expected", () => {
    expect(compress(original)).toEqual(compressed)
  })

  it("compress(array, func) to equal expected", () => {
    expect(compress(originalObj, compareObj)).toEqual(compressedObj)
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
    expect(decompress(compressed)).toEqual(original)
  })

  it("decompress(array, func) to equal expected", () => {
    const result = decompress(compressedObj, copyObj)
    expect(result).toEqual(originalObj)

    // different object
    expect(result[0] === result[1]).toBeFalsy()
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

describe("generics", () => {
  it("generics usage", () => {
    expect(compress(original)).toEqual(compressed)
    expect(decompress(compressed)).toEqual(original)
  })
})
