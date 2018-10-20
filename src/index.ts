export type compressedItem<T = any> = {
  value: T
  count: number
}

export type compareFunction<T = any> = (src: T, dst: T) => boolean

export const compress = <T = any>(array: Array<T>, compare?: compareFunction<T>): Array<compressedItem<T>> => {
  if (!array || !array.length) {
    throw new Error("compress expects the first arg to be array.")
  }

  if (!compare) {
    compare = (src: T, dst: T) => src === dst
  }

  const result: Array<compressedItem<T>> = []
  result.push({ value: array[0], count: 1 })

  for (let i = 1; i < array.length; i++) {
    const prev = result[result.length - 1]
    if (compare(prev.value, array[i])) {
      prev.count++
    } else {
      result.push({ value: array[i], count: 1 })
    }
  }
  return result
}

export type copyFunction<T = any> = (src: T) => T

export const decompress = <T = any>(array: Array<compressedItem<T>>, copy?: copyFunction<T>): Array<T> => {
  if (!array || !array.length) {
    throw new Error("decompress expects the first arg to be array.")
  }

  if (!copy) {
    copy = (src: T) => src
  }

  const result: Array<T> = []

  for (let i = 0; i < array.length; i++) {
    const temp = array[i]
    for (let j = 0; j < temp.count; j++) {
      result.push(copy(temp.value))
    }
  }
  return result
}
