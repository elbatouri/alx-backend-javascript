export default function appendToEachArrayValue(array, appendString) {
  const ary = [];
  for (const val of array) {
    ary.push(appendString + ary[ary.index(val)]);
  }

  return ary;
}
