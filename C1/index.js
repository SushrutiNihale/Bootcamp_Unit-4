const express = require('express');
const req = require('express/lib/request');
const app = express();

app.listen(3002,() => {
    console.log('listening on 3002');
});

app.get("/books",logPath,(req,res) => {
    res.send({ route: "/books"});
});

app.get("/libraries",logPath,checkPermission("/libraries"),(req,res) => {
    res.send({ route: "/libraries", permission: req.permission});
});

app.get("/authors",logPath,checkPermission("/authors"),(req,res) => {
    // console.log(req.permission);
    res.send({ route: "/authors", permission: req.permission});
});

function checkPermission(path) {
    return function logger(req,res,next) {
        if (path == '/authors' || path == '/libraries') {
            req.permission = true;
            next();
        } else {
            return res.send('Not allowed');
        }
    }
}

function logPath(req,res,next) {
    console.log(req.path);
    next();
}