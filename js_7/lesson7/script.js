// const c = require('./func');
// console.log(c.func(50));

// const os = require('os');
// console.log(os.cpus());

 const fs = require("fs");
// let users = [{"name":"John","id":12}];
// fs.writeFile('test.json',JSON.stringify(users),(err)=>{
//     if(err){
//         console.log(err);
//     }
// });
// let user2 = '{"name":"Petr","id":10}';
// fs.readFile('test.json','utf-8',(err,data)=>{//data - исходник файла json
//     if(err){
//         console.log(err);
//     }
//     else{
//         let users = JSON.parse(data);//преобразовали строку JSON в объект
//         users.push(JSON.parse(user2));
//         fs.writeFile('test.json',JSON.stringify(users),(err)=>{
//             if(err){
//                 console.log(err);
//             }
//         });
//     }
// })
// console.log(new Date());

// const moment = require('moment');
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

const http = require("http");
const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        res.write("Welcome to server!");
        res.end();
    }
    if(req.url == '/api/users'){
        fs.readFile('test.json','utf-8',(err,data)=> {//data - исходник файла json
            if (err) {
                console.log(err);
            } else {
                res.write(data);
            }
        });
    }
});
server.on('connection',(socket)=>{
    console.log('success connection');
});
server.listen(3000);
console.log('new connection on port 3000!!!');