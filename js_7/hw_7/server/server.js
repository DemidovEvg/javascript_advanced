const express = require('express');
const fs = require('fs');
const path = require('path');

const db = require('./db.js');

const cart = require('./cartRouter');


async function main() {
    await db.db.init();
    console.log('Запускаем сервер');
    startServer();
}

main();

function startServer() {
    const app = express();
    const cors = require('cors');
    app.use(cors({
        origin: '*'
    }));
    app.use(express.json());
    app.use('/', express.static(path.resolve(__dirname, '../public')));
    app.use('/api/cart', cart);

    // app.get();
    // app.post();
    // app.put();
    // app.delete();

    app.get('/api/products', (req, res) => {
        fs.readFile(path.resolve(__dirname, 'db/products.json'), 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
            } else {
                res.send(data);
            }
        })
    });


    // app.get('/api/cart/:id', (req, res) => {
    //     // res.send(req.params.id);
    //     res.send(req.query);
    // });

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listen on port ${port}...`));
}


