const express = require("express");
const router = express.Router();
const userModel = require("./../models/User");
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const uploader = require("./../config/cloudinary");

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signup", (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };
    userModel
        .findOne({
            email: req.body.email
        })
        .then(dbRes => {
            if (dbRes) {
                res.redirect("/home");
            } else {
                userModel
                    .create(newUser)
                    .then(dbRes => {
                        res.redirect("/home");
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;