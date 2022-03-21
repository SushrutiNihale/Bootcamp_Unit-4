const express = require("express");
const router = express.Router();

const Comment = require("../models/comment.model");

router.get("", async(req,res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 30;
        const skip = (page -1) * pageSize;
        const totalPages = Math.ceil(await Comment.find({}).countDocuments());
        const comments = await Comment.find({}).skip(skip).limit(pageSize).lean().exec();
        return res.status(200).send(comments, totalPages);
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.post("", async(req,res) => {
    try {
        const comment = await Comment.create(req.body);
        return res.status(200).send(comment);
    } catch(err) {
        return res.status(500).send(err);
    }
});

module.exports = router;