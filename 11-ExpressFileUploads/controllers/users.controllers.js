const express = require("express");
const fs = require("fs");
const router = express.Router();

const upload = require("../middlewares/uploadProfilePic");
const User = require("../models/users.models");

// getting user list
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
    try{
        // getting data inputted at frontend
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        }
        // incorporating data into the database collection
        const user = await User.create(data);
        return res.status(200).send({user});
    } catch (err) {
        return res.status(500).send(err);
    }
});

// updating a user
// ?_method=PUT is used here since patch requests don't allow form data to be sent
// router.post("/?_method=PUT/:userId", async(req,res) => {
//     try {
//         // for reasons unknown to me, we don't seem to require multer to get the file here
//         const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
//         return res.status(200).send(user);
//     } catch (err) {
//         return res.status(500).send(err);
//     }
// });

// updating a user
router.patch("/:userId", upload.single("profile_pic"), async(req,res) => {
    try{
        // getting data inputted at frontend
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        }
        
        // getting user
        let user = await User.findById(req.params.userId);
        // getting path to the user profile pic
        let path = user.profile_pic;
        // deleting the previous user profile pic
        fs.unlinkSync(path);

        // updating data in the database collection
        user = await User.findByIdAndUpdate(req.params.userId, data, {new: true});
        return res.status(200).send({user});
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.delete("/:userId", async(req,res) => {
    try {
        let user = await User.findById(req.params.userId);
        let path = user.profile_pic;
        fs.unlinkSync(path);
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).send(user);
    } catch(err) {
        return res.status(500).send(err);
    }
})

module.exports = router;