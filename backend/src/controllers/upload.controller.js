import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (req, res) => {
  try {
    console.log("INSIDE UPLOAD CONTROLLER");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    // delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      image_url: result.secure_url,
    });
  } catch (error) {
    console.error("CLOUDINARY ERROR ", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
