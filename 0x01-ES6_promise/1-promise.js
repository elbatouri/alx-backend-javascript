export default function getFullResponseFromAPI(success) {
  // Return a Promise that can either resolve or reject based on the 'success' parameter.
  return new Promise((resolve, reject) => {
    if (success) {
      // If 'success' is true, resolve the Promise with a success object.
      resolve({
        status: 200,  // HTTP status code for success
        body: 'Success',  // Success message or response body
      });
    } else {
      // If 'success' is false, reject the Promise with an error object.
      reject(new Error('The fake API is not working currently'));
    }
  });
}
