import Product from "../models/Product.js";

// POST /api/sweets/:id/purchase
export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Product.findById(req.params.id);


    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.availableQuantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.availableQuantity -= 1;
    await sweet.save();

    res.status(200).json({
      message: "Purchase successful",
      availableQuantity: sweet.availableQuantity,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
