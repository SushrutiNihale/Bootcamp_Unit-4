const express = require('express');
const { json } = require('express/lib/response');
const app = express();



app.get("", (req,res) => {
    res.send('hello');
});

app.get('/books', (req,res) => {
    let data = [
        {name: 'name1',content:'content1'},
        {name: 'name2',content:'content2'},
        {name: 'name3',content:'content3'},
        {name: 'name4',content:'content4'}
    ];
    res.send(JSON.stringify(data));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});