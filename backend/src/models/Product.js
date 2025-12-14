import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    availableQuantity: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
