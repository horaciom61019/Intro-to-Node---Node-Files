const fs = require('fs');
const process = require('process');

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

cat(process.argv[2]);