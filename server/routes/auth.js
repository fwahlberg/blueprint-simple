const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const {
    auth
} = require('../middleware/auth');
// const {
//     welcomeNewUser
// } = require('../emails/users')

router.post("/register", async (req, res) => {
    //Setup new user object as defined in models/User.js
    const user = new User(req.body);

    try {
        //Save user in mongodb
        await user.save();
        const token = await user.generateAuthToken();
        const {
            name,
            phone,
            email
        } = user
        // welcomeNewUser(user.email, {
        //     name,
        //     phone,
        //     email
        // })
        res.status(201).send({
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();



        res.send({
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});



router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();


        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

router.post("/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();


        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;