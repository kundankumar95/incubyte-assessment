import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import uploadRouter from "./routes/upload.route.js";
import productRouter from "./routes/product.route.js";
import sweetRoutes from "./routes/sweet.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running ");
});


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/sweets", sweetRoutes);







const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
