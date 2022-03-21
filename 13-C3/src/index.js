const express = require("express");
const app = express();

const commentController = require("./controllers/comment.controller");
const bookController = require("./controllers/book.controller");
const {register,login} = require("./controllers/auth.controller");

app.use(express.json());
app.use("/comments",commentController);
app.use("/book",bookController);
app.use("/register",register);
app.use("/login",login);

module.exports = app;