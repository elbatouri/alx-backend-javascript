export default function appendToEachArrayValue(array, appendString) {
  const ary = [];
  for (const val of ary) {
    ary.push(appendString + ary[ary.index(val)]);
  }

  return ary;
}
