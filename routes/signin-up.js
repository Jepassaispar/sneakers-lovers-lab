const express = require('express');
const router = express();
const userModel = require("./../models/User");
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signup", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt)
    userModel
        .findOne({
            email: req.body.email
        })
        .then(dbRes => {
            if (dbRes) {
                console.log("already taken");
                res.redirect("/home");
            } else {
                userModel
                    .create({
                        firstname,
                        lastname,
                        email,
                        password: hashPass
                    })
                    .then(dbRes => {
                        res.redirect("/home");
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

router.post('/signin', (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    if (inputEmail === "" || inputPassword === "") {
        res.render('signin', {
            errorMessage: "Please enter both, email and password to sign up"
        })
        return;
    }
    userModel
        .findOne({
            "email": inputEmail
        })
        .then(dbRes => {
            if (!dbRes) {
                console.log("Email not registered");
                return;
            }
            if (bcrypt.compareSync(inputPassword, dbRes.password)) {
                req.session.currentUser = dbRes;
                res.redirect('home');
            } else {
                console.log("incorrect password !");
                res.render('signin');
            }
        })
})


module.exports = router;