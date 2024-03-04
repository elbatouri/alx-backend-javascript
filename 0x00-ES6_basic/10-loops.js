export default function appendToEachArrayValue(array, appendString) {
  const ary = [];
  for (const val of array) {
    ary.push(appendString + array[array.index(val)]);
  }

  return ary;
}
