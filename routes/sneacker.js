const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");
const uploader = require("../config/cloudinary");

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
    sneakerModel.findById(req.params.id).populate("id_tags").then(dbRes => {
        const sneaker = dbRes;
        console.log("sneaker" + sneaker);
        res.render("one_product", {
            sneaker
        });
    });
});

router.post("/product-delete/:id", (req, res) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then(res.redirect('/prod-manage'))
})

router.get('/product-edit/:id', (req, res) => {
    sneakerModel
        .findById(req.params.id)
        .populate('id_tags')
        .then(dbRes => {
            const sneaker = dbRes;
            console.log(sneaker)
            res.render('product_edit', sneaker)
        })
})

router.post('/product-edit/:id', (req, res) => {
    const editedSneaker = {
        name: req.body.name,
        ref: req.body.ref,
        sizes: req.body.size,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        id_tags: req.body.id_tags
    }
    sneakerModel
        .findByIdAndUpdate(req.params.id, editedSneaker)
        .then(dbRes => {
            sneakerModel
            console.log(dbRes)
            res.redirect('/home')
        })
})


router.get("/prod-add", (req, res) => {
    tagModel.find().populate('id_tags').then(dbRes => {
        res.render("products_add", {
            tags: dbRes
        });
    });
});

router.post("/prod-add", uploader.single("img"), (req, res) => {
    const newSneaker = {
        name: req.body.name,
        ref: req.body.ref,
        sizes: req.body.size,
        description: req.body.description,
        price: req.body.price,
        img: req.file.secure_url,
        category: req.body.category,
        id_tags: req.body.id_tags
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



router.get("/prod-manage", (req, res) => {
    sneakerModel
        .find()
        .then(dbRes => {
            console.log(dbRes)
            const sneakers = dbRes;
            res.render("products_manage", {
                sneakers
            })
        })
        .catch(err => console.log(err))
});

module.exports = router;