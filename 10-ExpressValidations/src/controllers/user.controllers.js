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
});

router.post("/",
    body('first_name').not().isEmpty().withMessage("First Name is required"),
    body('last_name').not().isEmpty().withMessage("Last Message is required"),
    body('email').not().isEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide valid email"),
    body('pincode').isNumeric().withMessage("Pincode should be a number")
        .isLength({min: 6, max: 6}).withMessage("Please provide valid pincode"),
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
    }
);

module.exports = router;