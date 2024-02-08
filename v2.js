
const fs = require('fs');
const filePath = 'playlist-Strong-1.m3u';
const m3uData = fs.readFileSync(filePath, 'utf8');

// console.log(m3uData)
// Split the data into lines
const lines = m3uData.split('\n');

// Initialize an array to store channel objects
const channels = [];
let cont=0;
// Iterate through each line
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  console.log(i)

  // Check if the line contains channel information
  if (line.startsWith("#EXTINF:")) {
    cont++;
    // Extract channel information from the line
    const channelInfo = line.match(/tvg-name="([^"]+)" tvg-logo="([^"]+)" group-title="([^"]+)"/);
    
    // Check if the match is successful
    if (channelInfo) {

      // console.log('salam'+channelInfo)
      const channelName = channelInfo[1];
      const logoUrl = channelInfo[2];
      const groupTitle = channelInfo[3];

      // Extract stream URL from the next line
      const streamUrl = lines[i + 1] ? lines[i + 1].trim() : '';

      // Create a channel object and push it to the array
      const channel = {
        channel: channelName,
        logo: logoUrl,
        'group-title': groupTitle,
        stream_url: streamUrl,
      };

      channels.push(channel);
    } else {
      console.error(`Error parsing channel information at line ${i + 1}: ${line}`);
    }
  }
}


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

const jsonData = JSON.stringify(channels, null, 2);
// Your existing code that uses console.log
console.log(jsonData);

// Restore the original console.log when you're done
console.log = originalConsoleLog;

// Close the file stream
fileStream.end();


console.log(cont)
// Convert the array to JSON


// Log the JSON data
// console.log(jsonData);

