const exp = require('constants');
const express = require('express');
const User = require("../models/user.model");

const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

// router.patch("/registration/:userId", async (req,res) => {
//     try {
//         const user = await User.findByIdAndUpdate(req.params.userId,{registered: "Yes"}, {new: true})
//             .lean()
//             .exec();
//         return res.status(200).send(user);
//     } catch (err) {
//         return res.status(500).send({error: err});
//     }
    
// });

// getting registered users
router.get("/registeredUsers", async (req,res) => {
    try {
        const users = await User.find({registered: "Yes"}).lean().exec();
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send(err);
    }
})

module.exports = router;