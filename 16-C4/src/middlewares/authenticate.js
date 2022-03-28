const jwt = require("jsonwebtoken");

require('dotenv').config();

const verify = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
            // console.log(decoded.foo) // bar
        });
    })
}

const authenticate = async(req,res,next) => {
    if (!req.headers.authorization) {
        return res.status(400).send("Authorization failed");
    }
    if (!req.headers.authorization.startsWith("Bearer")) {
        return res.status(400).send("Authorization failed");
    }

    const token = req.headers.authorization.trim().split(" ")[1];

    let decoded;

    try{
        decoded = await verify(token);

    }catch(err) {
        return res.status(400).send("Authorization failed");
    }

    req.userId = decoded.user._id;

    return next();
}

module.exports = authenticate;