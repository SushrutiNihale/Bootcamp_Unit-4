const connect = require("./configs/db.js");
const app = require("./index.js");

app.listen(5000, async () => {
    try {
        await connect();
    } catch (err) {
        console.log(err);
    }
    console.log('listening on port 5000 for Express Validations');
});

// const express = require("express");
// const router = express.Router;
// console.log(router.length());