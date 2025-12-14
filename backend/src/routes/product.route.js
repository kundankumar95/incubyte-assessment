import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  getProductsByCategory,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// POST /api/products/addproduct
router.post("/addproduct", addProduct);

//  LIST PRODUCTS (latest first)
router.get("/listproduct", listProducts);

// REMOVE PRODUCT
router.post("/removeproduct", removeProduct);

router.get("/category/:type", getProductsByCategory);
router.put("/:id", updateProduct);

export default router;
