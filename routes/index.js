const express = require("express");
const router = express.Router();
const userModel = require("./../models/User");
const sneakerModel = require("./../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.send("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("products_add", (req, res) => {
  const newSneakers = {
    name: ,
    ref: String,
    sizes: Number,
    description: String,
    price: Number,
    category: [
      {
        men: Boolean
      },
      {
        women: Boolean
      },
      {
        kids: Boolean
      }
    ],
    id_tags: {
      type: Schema.types.ObjectId,
      ref: "tag"
    }
  };
  sneaker
});

router.get("/prod-manage", (req, res) => {
  res.render("product_edit");
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
        console.log("user exist");
      } else {
        console.log("coucou je suis là");
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
