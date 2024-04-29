const http = require('http');
const fs = require('fs');
const { argv } = require('process');
const express = require('express');

const app = express();
const PORT = 1245;
const DB_FILE = argv[2] || '';

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {string} dataPath The path to the CSV data file.
 * @returns {Promise<string>} A Promise that resolves to a report of student counts and lists.
 * @throws {Error} If the database file cannot be loaded.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  } else {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const reportParts = [];
        const fileLines = data.trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(0, -1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(0, -1);
          const field = studentRecord[studentRecord.length - 1];
          studentGroups[field] = studentGroups[field] || [];
          const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroups).reduce((pre, cur) => pre + cur.length, 0);
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          const studentNames = group.map(student => student.firstname).join(', ');
          reportParts.push(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

// Handle requests for root URL
app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

// Handle requests for /students URL
app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.status(200).send(responseText);
    })
    .catch((err) => {
      responseParts.push(err.message || err.toString());
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.status(500).send(responseText);
    });
});

// Create HTTP server
const server = http.createServer(app);

// Start the server and listen for connections
server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
