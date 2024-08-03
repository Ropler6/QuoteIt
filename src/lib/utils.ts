
/**
 * Performs the set union operation on two arrays
 * @param array1 The first array
 * @param array2 The second array
 * @param comp The function used to compare elements from the two arrays
 * which should return `true` if the elements are identical (based on some
 * criteria) and `false` otherwise
 * @returns An array which contains elements that appear in both arrays
 */
export const arrayIntersection = <T> (array1: Array<T>, array2: Array<T>, comp: (x: T, y: T) => boolean) => {
    return array1.filter(x => array2.some(y => comp(x, y)));
}

/**
 * Performs the set difference operation on two arrays
 * @param array1 The first array
 * @param array2 The second array
 * @param comp The function used to compare elements from the two arrays
 * which should return `true` if the elements are identical (based on some
 * criteria) and `false` otherwise
 * @returns An array which contains elements that appear in the first array,
 * but not in the second one
 */
export const arrayDifference = <T> (array1: Array<T>, array2: Array<T>, comp: (x: T, y: T) => boolean) => {
    return array1.filter(x => !array2.some(y => comp(x, y)));
}