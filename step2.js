const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Reads the file at path and prints the contents of the file
function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1);
        }
        console.log(`File contents: ${data}`);
    })
};

// Reads the content of the URL and prints it to the console.
async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
};