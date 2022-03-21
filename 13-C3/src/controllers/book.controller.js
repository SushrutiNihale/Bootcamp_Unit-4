const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadCoverPic");

const Book = require("../models/book.model");

router.post("", upload.single("coverImage"), async(req,res) => {
    try {
        const book = await Book.create({
            likes: req.body.likes,
            content: req.body.content,
            coverImage: req.file.path
        });
        return res.status(200).send(book);
    } catch(err) {
        return res.status(500).send(err);
    }
});

module.exports = router;