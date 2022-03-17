const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        user_pictures: [{type: String, required: true}],
        user_id: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const Gallery = mongoose.model("gallery",gallerySchema);

module.exports = Gallery;