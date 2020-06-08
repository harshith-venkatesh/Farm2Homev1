import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  price: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
