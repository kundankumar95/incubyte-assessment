import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post(
  "/addproduct",
  protect,
  adminOnly,
  upload.single("image"),
  addProduct
);

export default router;
