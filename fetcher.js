/*
It should take two command line arguments:a URL, a local file path.
> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html
*/

const arr = process.argv.slice(2);
const targetUrl = arr[0];
const fileName = arr[1];

const request = require('request');
request(`${targetUrl}`, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  const content = body;
  const fs = require('fs');
  fs.writeFile(`${fileName}`, content, err => {
    if (err) {
      console.error(err);
      return;
    }
    //get fileSize
    const stats = fs.statSync(`${fileName}`);
    const fileSize = stats.size;
    //file written successfully
    console.log(`Downloaded and saved ${fileSize} bytes to ${fileName}`);
  });
});