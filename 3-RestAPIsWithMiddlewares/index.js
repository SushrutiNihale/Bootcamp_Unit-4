const { response } = require('express');
const express = require('express');
const app = express();

app.listen(3001, () => {
    console.log('listening on 3001');
})

app.get('/books', allBooks, (req,res) => {
    return res.send("");
});

function allBooks(req,res,next) {
    console.log ( "Fetching all books");
    next();
}

app.get('/book/:name',singleBook,(req,res) => {
    res.send({bookName: req.name});
})

function singleBook(req,res,next) {
    console.log(req.params.name);
    req.name = req.params.name;
    next();
}