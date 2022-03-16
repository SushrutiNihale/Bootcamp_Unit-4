const mongoose = require("mongoose");

// connecting to the database
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/Masai-pagination");
}

module.exports = connect;