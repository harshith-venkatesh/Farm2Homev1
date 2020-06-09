import express from "express";
import { isAdmin, isAuth } from "../util";
import Product from "../Models/productModel";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.table(req.body.name);

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    console.log(product.toJSON());
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "new product created", data: newProduct });
    }
    return res.status(500).send({ message: "Error in creating a product" });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // console.table(req.body.name);
    const productId = req.params.id;
    const product = await Product.findById({ _id: productId });
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.rating = req.body.rating;
      product.numReviews = req.body.numReviews;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "new product updated", data: updatedProduct });
      }
      return res.status(500).send({ message: "Error in updating a product" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product deleted" });
  } else {
    res.send("Error in sending");
  }
});
export default router;
