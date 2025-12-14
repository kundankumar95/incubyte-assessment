import express from "express";
import auth from "../middleware/authMiddleware.js";
import { purchaseSweet } from "../controllers/sweet.controller.js";

const router = express.Router();

router.post("/:id/purchase", auth, purchaseSweet);

export default router;
