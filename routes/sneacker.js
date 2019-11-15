const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");
const uploader = require("../config/cloudinary");

router.get("/sneakers/:cat", (req, res) => {
    if (req.params.cat === "collection") {
        sneakerModel.find().populate('tags').then(dbRes => {
                const sneakers = dbRes;
                res.render("products", {
                    sneakers
                });
            })
            .catch(err => console.log(err));
    } else {
        sneakerModel.find({
                'category': req.params.cat
            })
            .then(dbRes => {
                const sneakers = dbRes;
                res.render('products', {
                    sneakers
                })
            })
            .catch(err => console.log(err))
    }
});

router.get("/one-product/:id", (req, res) => {
    sneakerModel.findById(req.params.id).populate("tags").then(dbRes => {
        const sneaker = dbRes;
        res.render("one_product", {
            sneaker
        });
    });
});

router.post("/product-delete/:id", (req, res) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then(res.redirect('prod-manage'))
})

router.get('/product-edit/:id', (req, res) => {
    Promise.all([sneakerModel
        .findById(req.params.id)
        .populate('tags'), tagModel
        .find()
    ]).then(dbRes => {
        console.log(dbRes[0])
        const sneaker = dbRes[0];
        const tags = dbRes[1];
        res.render("product_edit", {
            sneaker,
            tags
        })
    }).catch(err => console.log(err))
})



router.post('/product-edit/:id', (req, res) => {
    const editedSneaker = {
        name: req.body.name,
        ref: req.body.ref,
        sizes: req.body.size,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.id_tags
    }
    sneakerModel
        .findByIdAndUpdate(req.params.id, editedSneaker)
        .then(dbRes => {
            sneakerModel
            res.redirect('/home')
        })
})

router.post("/product-edit/:id", (req, res) => {
    const editedSneaker = {
        name: req.body.name,
        ref: req.body.ref,
        sizes: req.body.size,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        id_tags: req.body.id_tags
    };
    sneakerModel.findByIdAndUpdate(req.params.id, editedSneaker).then(dbRes => {
        res.redirect("/home");
    });
});

router.get("/prod-add", (req, res) => {
    tagModel.find().populate('tags').then(dbRes => {
        res.render("products_add", {
            tags: dbRes
        });
    });
});

// res.redirect("prod-add")

router.post("/prod-add", uploader.single("img"), (req, res) => {
    const newSneaker = {
        name: req.body.name,
        ref: req.body.ref,
        sizes: req.body.size,
        description: req.body.description,
        price: req.body.price,
        img: "https://images-na.ssl-images-amazon.com/images/I/71un1O0nQOL._UY500_.jpg",
        category: req.body.category,
        id_tags: req.body.id_tags
    };
    if (req.file) {
        newSneaker.img = req.file.secure_url;
    } else res.redirect("/prod-add");
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
    sneakerModel
        .find()
        .then(dbRes => {
            const sneakers = dbRes;
            res.render("products_manage", {
                sneakers
            })
        })
        .catch(err => console.log(err))
});

module.exports = router;