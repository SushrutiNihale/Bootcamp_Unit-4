const express = require("express");
const app = express();

const transporter = require("./configs/mail")

const usersController = require("./controllers/user.controller");
const registrationController = require("./controllers/registration.controller");

app.use("/users",usersController);
app.use('/registration',registrationController);

module.exports = app;