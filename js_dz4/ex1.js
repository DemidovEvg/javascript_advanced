const fs = require("fs");


function main() {
    fileHandler('texttoreplace.txt');
}

function fileHandler(filePath) {
    let data = null;
    data = fs.readFileSync(filePath, 'utf8');

    let newText = data.replace(/'/g, '"');

    fs.writeFileSync('result_ex1.txt', newText);
}

main();