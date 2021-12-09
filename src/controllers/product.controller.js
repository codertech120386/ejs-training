const express = require("express");
const multer = require("multer");

const upload = require("../middlewares/file-upload");

const crudController = require("./crud.controller");

const router = express.Router();

const Product = require("../models/product.model");

router.get("/new", async function (req, res) {
  return res.render("products/new");
});

router.get("/", crudController(Product, "products/all", "products").getAll);
// router.get("/", async function (req, res) {
//   const products = await Product.find().lean().exec();

//   return res.render("products/all", {
//     products,
//   });
// });

router.get("/:id", async function (req, res) {
  const product = await Product.findById(req.params.id).lean().exec();

  return res.render("products/single", {
    product,
  });
});

router.post(
  "/single",
  upload.single("productImages"),
  async function (req, res) {
    // Everything went fine.
    try {
      const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image_urls: req.file.path,
      });
      return res.redirect(`/products/${product._id}`);
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }
  }
);

router.post(
  "/multiple",
  upload.any("productImages"),
  async function (req, res) {
    const filePaths = req.files.map((file) => file.path);

    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      image_urls: filePaths,
    });
    return res.status(201).send(product);
  }
);

module.exports = router;
