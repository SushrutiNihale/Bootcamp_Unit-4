const express = require("express");
const router = express.Router();

const { body, validationResult } = require('express-validator');
const User = require("../models/user.models");

router.get("/", async (req,res) => {
    try {
        let users = await User.find().lean().exec();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post("/",
    body('first_name').not().isEmpty(),
    body('last_name').not().isEmpty(),
    body('email').not().isEmpty().isEmail(),
    body('pincode').isNumeric().isLength({min: 6, max: 6}),
    body('age').isNumeric().custom((val) => {
        if (val < 1 || val > 100) {
            throw new Error("Please provide valid age");
        }
        return true;
    }),
    body('gender').not().isEmpty().isIn(["Male","Female","Others"]),
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const user = await User.create(req.body);
            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send({error: err});
        }
});

module.exports = router;