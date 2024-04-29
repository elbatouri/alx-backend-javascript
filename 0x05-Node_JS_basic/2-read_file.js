const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {string} dataPath The path to the CSV data file.
 */
const countStudents = (dataPath) => {
  // Check if the file exists
  if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read file contents
  const fileContent = fs.readFileSync(dataPath, 'utf-8').trim();

  // Split file content into lines
  const fileLines = fileContent.split('\n');

  // Extract field names from the first line
  const dbFieldNames = fileLines.shift().split(',');

  // Extract student properties and groups
  const studentGroups = {};
  for (const line of fileLines) {
    const [props, field] = line.trim().split(',').reverse();
    if (!studentGroups[field]) {
      studentGroups[field] = [];
    }
    const studentObj = Object.fromEntries(
      dbFieldNames.slice(0, dbFieldNames.length - 1).map((prop, idx) => [prop, props.split(',')[idx]])
    );
    studentGroups[field].push(studentObj);
  }

  // Calculate total number of students
  const totalStudents = Object.values(studentGroups).reduce((total, group) => total + group.length, 0);

  // Output total number of students and number of students in each group
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(studentGroups)) {
    const studentNames = group.map(student => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
