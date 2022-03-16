const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Admin = require("../models/admin.model");
const transporter = require('../configs/mail')

router.post('/:userId', async (req,res) => {
    try {
        // send mail code here
        let user = await User.findById(req.params.userId);
        const admin = await Admin.find();

        await transporter.sendMail({
            from: '"fw15_580" <fw15_580@example.com>', // sender address
            to: `${user.first_name} ${user.last_name}, ${user.email}`, // list of receivers
            subject: `Welcome to ABC system ${user.first_name}  ${user.last_name}`, // Subject line
            text: `Hi ${user.first_name}, Please confirm your email address`, // plain text body
            html: `<p>Hi ${user.first_name}, Please confirm your email address</p>`, // html body
        });

        for (let i = 0; i < admin.length; i++) {
            // setTimeout(() => {
                transporter.sendMail({
                    from: '"fw15_580" <fw15_580@example.com>', // sender address
                    to: `${admin[i].email}`, // list of receivers
                    subject: `${user.first_name} ${user.last_name} has registered with us`, // Subject line
                    text: `Please welcome ${user.first_name}`, // plain text body
                    html: `<p>Please welcome ${user.first_name}</p>`, // html body
                })
                console.log(admin[i].email);
            // }, 500);
            
        }
        
        user = await User.findByIdAndUpdate(req.params.userId,{registered: "Yes"},{new: true});
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

module.exports = router;