const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
    },
    {
        versionKey: false,
        timestamps: true
    }
);

userSchema.pre("save", function() {
    const hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
    return next();
});

userSchema.methods.checkPassword = (inputPassword) => {
    bcrypt.compareSync(inputPassword, this.password);
}

const User = mongoose.model("user",userSchema);
module.exports = User;