const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema(
    {
        name: {type: String},
        bookId: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Pub = mongoose.model("pub",pubSchema);
module.exports = Pub;