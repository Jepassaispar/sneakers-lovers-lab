const express = require("express");
const router = express.Router();
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const uploader = require("./../config/cloudinary");

router.post("/tag-add", (req, res) => {
    const newTag = {
        label: req.body.label
    };
    tagModel
        .create(newTag)
        .then(dbRes => {
            res.redirect("/home");
        })
        .catch(err => {
            console.log(err)
            // res.redirect("/prod-add");
        });
});

module.exports = router;