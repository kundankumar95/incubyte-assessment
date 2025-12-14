import express from "express";
import multer from "multer";
import { uploadToCloudinary } from "../controllers/upload.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), uploadToCloudinary);

export default router;
