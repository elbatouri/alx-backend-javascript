export default function createInt8TypedArray(length, position, value) {
  // Check if the position is within the range of the array
  if (position >= length || position < 0) throw Error('Position outside range');
  
  // Create a new ArrayBuffer with the specified length
  const buffer = new ArrayBuffer(length);

  // Create a DataView to access and manipulate the buffer
  const newView = new DataView(buffer, 0, length);
  
  // Create an Int8Array to work with the buffer
  const arr = new Int8Array(buffer);
  
  // Set the value at the specified position in the Int8Array
  arr[position] = value;
  
  // Return the DataView for accessing the ArrayBuffer
  return newView;
}
