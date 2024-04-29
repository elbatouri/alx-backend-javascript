const http = require('http');

// Define the port and host
const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';

// Create an HTTP server instance
const server = http.createServer();

// Handle incoming requests
server.on('request', (_, res) => {
  // Define the response text
  const responseText = 'Hello Holberton School!';

  // Set response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);
  res.statusCode = 200;

  // Write the response
  res.write(Buffer.from(responseText));
});

// Start the server and listen for connections
server.listen(SERVER_PORT, SERVER_HOST, () => {
  // Log a message when the server starts
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

// Export the server for external use
module.exports = server;
