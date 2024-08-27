
/**
 * Performs binary search on the given array to find the index of `target`
 * @param array An array of objects of type `T`
 * @param target The object to search for
 * @param prop A function to determine the property based on which to perform
 * the search. The default is the object itself.
 * @returns The index of the object or `-1` if it is not in the array
 */
export const binarySearch = <T> (array: Array<T>, target: T, prop: (x: T) => any = (x: T) => x) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = left + (right - left) / 2;
        if (prop(array[mid]) === prop(target)) return mid;
        if (prop(array[mid]) > prop(target)) right = mid - 1;
        else left = mid + 1;
    }

    return -1;
}

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
    if (array2.length === 0) return array1;
    if (array1.length === 0) return [];
    return array1.filter(x => !array2.some(y => comp(x, y)));
}

/**
 * Performs the set union operation on two arrays
 * @param array1 The first array
 * @param array2 The second array
 * @param comp The function used to compare elements from the two arrays
 * which should return `true` if the elements are identical (based on some
 * criteria) and `false` otherwise
 * @returns An array which contains unique elements that appear in both arrays
 */
export const arrayUnion = <T> (array1: Array<T>, array2: Array<T>, comp: (x: T, y: T) => boolean) => {
    return arrayDifference(array1, array2, comp).concat(array2);
}

/**
 * Creates a string that displays the elapsed time between `now` and `date`
 * @param date The date from which to display the elapsed time
 * @returns The time string
 */
export const elapsedTimeString = (date: Date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;
    if (secondsPast < 60) {
        return `${Math.round(secondsPast)} s`;
    }
    if (secondsPast < 3600) {
        return `${Math.round(secondsPast / 60)} min`;
    }
    if (secondsPast <= 86400) {
        return `${Math.round(secondsPast / 3600)} h`;
    }

    return `${date.toDateString()}`;
}