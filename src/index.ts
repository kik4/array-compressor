export type compressedItem = {
  value: any
  count: number
}

export const compress = (array: Array<any>): Array<compressedItem> => {
  if (!array || !array.length) {
    throw new Error("compress expects the first arg to be array.")
  }

  const result: Array<compressedItem> = []
  result.push({ value: array[0], count: 1 })

  for (let i = 1; i < array.length; i++) {
    const prev = result[result.length - 1]
    if (prev.value === array[i]) {
      prev.count++
    } else {
      result.push({ value: array[i], count: 1 })
    }
  }
  return result
}

export const decompress = (array: Array<compressedItem>): Array<any> => {
  if (!array || !array.length) {
    throw new Error("decompress expects the first arg to be array.")
  }

  const result: Array<any> = []

  for (let i = 0; i < array.length; i++) {
    const temp = array[i]
    for (let j = 0; j < temp.count; j++) {
      result.push(temp.value)
    }
  }
  return result
}
