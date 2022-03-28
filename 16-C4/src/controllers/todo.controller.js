const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const Todo = require("../models/todo.models");

router.get("/:userId", authenticate, async(req,res) => {
    try{
        const todos = await Todo.find({userId: req.params.userId});
        return res.status(200).send(todos);
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.post("", authenticate, async(req,res) => {
    try{
        const todo = await Todo.create(req.body);
        return res.status(200).send(todo);
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.get("/:id", authenticate, authorise, async(req,res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        return res.status(200).send(todo);
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.patch("/:id", authenticate, authorise, async(req,res) => {
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).send(todo);
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.delete("/:id", authenticate, authorise, async(req,res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).send(todo);
    } catch(err) {
        return res.status(500).send(err);
    }
});

module.exports = router;