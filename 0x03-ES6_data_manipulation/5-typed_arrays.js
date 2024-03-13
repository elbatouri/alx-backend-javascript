export default function createInt8TypedArray(length, position, value) {
  // Check if the position is within the range of the array
  if (position >= length || position < 0) throw Error('Position outside range');
  const buffer = new ArrayBuffer(length);
  const newView = new DataView(buffer, 0, length);
  const arr = new Int8Array(buffer);
  arr[position] = value;
  return newView;
}
