const fs = require('fs').promises;

const path = require('path');

async function copyFile(pathToFile) {
    const data = await fs.readFile(pathToFile, 'utf-8');
    let {
        root: root,
        dir: dir,
        base: base,
        ext: ext,
        name: name
    } = path.parse(pathToFile);

    let newPathToFile = dir + '/' + base.slice(1,);

    await fs.writeFile(newPathToFile, data);
}

async function init() {
    await copyFile(path.resolve(__dirname, 'db/_products.json'));
    await copyFile(path.resolve(__dirname, 'db/_userCart.json'));
    console.log('Инициализация базы данных завершена');
}

module.exports.db = { init };
