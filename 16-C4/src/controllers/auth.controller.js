const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({user},process.env.SECRET_KEY);
}

const register = async(req,res) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if (user) {
            return res.status(400).send("Email is already registered with us");
        }

        user = await User.create(req.body);

        const token = generateToken(user);

        return res.status(200).send({user,token});

    } catch(err) {
        return res.status(500).send(err);
    }
}

const login = async(req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).send("Incorrect email/password");
        }

        let match = user.checkPassword(req.body.password);

        if (!match) {
            return res.status(400).send("Incorrect email/password");
        }

        const token = generateToken(user);

        return res.status(200).send({user,token});

    } catch(err) {
        return res.status(500).send(err);
    }
}

module.exports = {register,login};