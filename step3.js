const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Reads the file at path and prints the contents of the file
function cat(path, out){
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1);
        }
        handleOutput(data, out)
    })
};

// Reads the content of the URL and prints it to the console.
async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out)
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}


// Optionally provide an argument to output to a file

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf-8', (err) => {
            if (err) {
                console.error(`Unable to write ${out}: ${err}`);
                process.exit(1);
            }
        });
    };
    console.log(text);
};


let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
};

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
};