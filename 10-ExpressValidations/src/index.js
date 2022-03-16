const express = require("express");
const app = express();

const userController = require("./controllers/user.controllers");

app.use(express.json()); // to add data to the server, i.e, the post operations
app.use("/users",userController);

module.exports = app;