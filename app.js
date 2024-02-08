
const fs = require('fs');

const outputPath = 'data.txt';

const originalConsoleLog = console.log;

// Create a write stream to the file
const fileStream = fs.createWriteStream(outputPath);

// Redirect console.log to write to the file
console.log = function (message) {
  // Log to the original console.log
  originalConsoleLog(message);
  // Write to the file stream
  fileStream.write(`${message}\n`);
};

// Your existing code that uses console.log
console.log('cc');

// Restore the original console.log when you're done
console.log = originalConsoleLog;

// Close the file stream
fileStream.end();