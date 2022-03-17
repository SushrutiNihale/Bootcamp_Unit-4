const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadProfilePic");
const User = require("../models/users.models");

router.get("", async(req,res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    } catch(err) {
        return res.status(500).send(err);
    }
});

// creating a user
router.post("", upload.single("profile_pic"), async(req,res) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_pic: req.file.path
    }
    await User.create(user);
    return res.send({user});
});

module.exports = router;