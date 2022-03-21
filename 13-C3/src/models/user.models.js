const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true, minlength: 3, maxlength: 30},
        lastName: {type: String,  required: false, minlength: 3, maxlength: 30},
        age: {type: Number, required: true, min: 1, max: 150},
        email: {type: String, required: true, unique: true},
        profileImages: [{type: String, required: true}],
        bookId: {type: String} // only if user is an author
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("user",userSchema);
module.exports = User;