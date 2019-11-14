const express = require("express");
const router = express.Router();
const userModel = require("./../models/User");
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  if (req.params.cat === "collection") {
    sneakerModel.find().then(dbRes => {
      const sneakers = dbRes;
      res.render("products", {
        sneakers
      });
    });
  } else {
    sneakerModel
      .find({
        category: req.params.cat
      })
      .then(dbRes => {
        let sneakers = dbRes;
        res.render("products", {
          sneakers
        });
      })
      .catch(err => console.log(err));
  }
});

router.get("/one-product/:id", (req, res) => {
  sneakerModel.findById(req.params.id).then(dbRes => {
    const sneaker = dbRes;
    console.log("sneaker" + sneaker);
    res.render("one_product", {
      sneaker
    });
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/prod-add", (req, res) => {
  tagModel.find().then(dbRes => {
    res.render("products_add", {
      tags: dbRes
    });
  });
});

router.post("/prod-add", (req, res) => {
  const newSneaker = {
    name: req.body.name,
    ref: req.body.ref,
    sizes: req.body.size,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  };
  sneakerModel
    .create(newSneaker)
    .then(dbRes => {
      res.redirect("/home");
    })
    .catch(err => {
      res.redirect("/prod-add");
    });
});

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
      console.log(err);
      // res.redirect("/prod-add");
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
