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

router.post("/prod-add", (req, res) => {
  const newSneaker = {
    name: req.body.name,
    ref: req.body.ref,
    sizes: req.body.size,
    description: req.body.description,
    price: req.body.price,
    category: req.body["Category"]
  };
  console.log(req.body["Category"]);
  sneakerModel
    .create(newSneaker)
    .then(dbRes => {
      res.redirect("/home");
    })
    .catch(err => {
      res.redirect("/prod-add");
    });
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
