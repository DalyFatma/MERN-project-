const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const isAuth = require("../middlewares/isAuth");
const upload = require("../utils/multer");

// Create a product
router.post(
  "/product",
  isAuth(),
  upload("products").single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded.");
      }

      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      const newProduct = new Product({ ...req.body, user: req.user._id });
      newProduct.imagesrc = url;

      await newProduct.save();
      res.send({ msg: "Product added successfully", product: newProduct });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.query.name || "", $options: "i" },
    })
      .sort({ createOn: -1 })
      .populate("user");
    res.send(products);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Update a product
router.put(
  "/:id",
  isAuth(),
  upload("products").single("file"),
  async (req, res) => {
    try {
      const result = await Product.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      ProductUpdated = await Product.findOne({ _id: req.params.id });

      if (req.file) {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
        ProductUpdated.imagesrc = url;
        await ProductUpdated.save();
      }
      console.log(result);
      if (result.modifiedCount || req.file) {
        return res.send({ msg: "Product updated successfully", hack: ProductUpdated });
      }

      res.status(400).send({ msg: " Product aleardy updated " });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);
//get one product

router.get("/:id", async (req, res) => {
  try {
    const oneProduct = await Product.findById(req.params.id);
    res.send({ product: oneProduct });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//delete product
router.delete("/:id", isAuth(), async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      return res.send({ msg: "Product deleted successfully" });
    }
    res.status(400).send({ msg: "Product aleardy deleted" });
  } catch (error) {
    console.log(error);

    res.status(400).send(error.message);
  }
});

module.exports = router;
