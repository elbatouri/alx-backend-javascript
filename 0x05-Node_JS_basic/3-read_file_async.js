const fs = require('fs');

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<Boolean>} A Promise that resolves to true if the operation succeeds.
 *                            Otherwise, it rejects with an error.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  // Read the file asynchronously
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    // If an error occurs during file reading, reject the Promise with an error message
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    // If data is successfully read
    if (data) {
      // Split the data into lines
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames
        .slice(0, dbFieldNames.length - 1);

      // Process each line of the file
      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord
          .slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];
        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Calculate total number of students
      const totalStudents = Object
        .values(studentGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      // Output number of students in each field
      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      // Resolve the Promise with true to indicate success
      resolve(true);
    }
  });
});

module.exports = countStudents;
