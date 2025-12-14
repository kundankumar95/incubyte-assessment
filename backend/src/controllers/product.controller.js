import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, price, category, availableQuantity, image } = req.body;

    if (
      !name ||
      typeof price !== "number" ||
      typeof availableQuantity !== "number" ||
      !category ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and must be valid",
      });
    }

    const product = new Product({
      id: crypto.randomUUID(),
      name: name.trim(),
      price,
      category,
      availableQuantity,
      image,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR FULL:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
};


export const listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("LIST PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* REMOVE PRODUCT */
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("REMOVE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { type } = req.params;

    const products = await Product.find({
      category: type,
    }).sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("CATEGORY PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
