const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true},
        pincode: {type: Number, min: 111111, max: 1000000, required: true},
        age: {type: Number, min: 1, max: 100, required: true},
        gender: {type: String, enum: ["Male","Female","Others"], required: true}
    },
    {
        versionKey: false
    }
);

const User = mongoose.model("user",userSchema);

module.exports = User;