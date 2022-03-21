const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        body: {type: String},
        bookId: {type: String},
        userId: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Comment = mongoose.model("comment",commentSchema);
module.exports = Comment;