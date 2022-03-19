const express = require("express");
const app = express();

const userController = require("./controllers/users.controller");

app.use(express.json());
app.use("/users",userController);

module.exports = app;