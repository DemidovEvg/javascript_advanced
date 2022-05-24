const fs = require("fs");


function main() {
    fileHandler('texttoreplace.txt');
}

async function fileHandler(filePath) {
    await fs.readFile(filePath, 'utf8', function (error, data) {
        let newText = data.replace(/((?<=\s)\')|(\'(?=\s))|(^\')|(\'$)/g, '"');
        // for (let match of matches) {
        //     console.log(match);
        // }
        console.log(newText);
    });
}

function fileHandler(filePath) {
    let data = null;
    data = fs.readFileSync(filePath, 'utf8');
    let newText = data.replace(/((?<=\s)\')|(\'(?=\s))|(^\')|(\'$)/g, '"');

    fs.writeFileSync('result_ex2.txt', newText);
}

main();