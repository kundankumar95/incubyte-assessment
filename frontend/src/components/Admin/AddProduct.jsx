import { useState } from "react";
import upload_area from "../../assets/upload_image.png";
import "../../styles/admin.css";

const API_URL = "https://incubyte-assessment-1-f38k.onrender.com";
console.log("API_URL =", API_URL);


const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "cakes",
    availableQuantity: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  /* ADD PRODUCT */
  const addProduct = async () => {
    try {
      if (!image) {
        alert("Please upload an image");
        return;
      }

      /* Upload Image */
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json(); 

      if (!uploadRes.ok || !uploadData.success) {
        throw new Error("Image upload failed");
      }

      /* Add Product */
      const productRes = await fetch(`${API_URL}/api/products/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productDetails,
          price: Number(productDetails.price),
          availableQuantity: Number(productDetails.availableQuantity),
          image: uploadData.image_url, 
        }),
      });

      const productData = await productRes.json();

      if (!productRes.ok || !productData.success) {
        throw new Error(productData.message || "Failed to add product");
      }

      alert("Product added successfully");

      setProductDetails({
        name: "",
        price: "",
        category: "cakes",
        availableQuantity: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card addproduct">
        <div className="addproduct">
          <h2>Add New Product</h2>

          <div className="addproduct-itemfield">
            <p>Product Name</p>
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={changeHandler}
              placeholder="Enter product name"
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Price</p>
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={changeHandler}
              placeholder="Enter price"
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Available Quantity</p>
            <input
              type="number"
              name="availableQuantity"
              value={productDetails.availableQuantity}
              onChange={changeHandler}
              placeholder="Enter stock count"
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Category</p>
            <select
              name="category"
              value={productDetails.category}
              onChange={changeHandler}
              className="addproduct-select"
            >
              <option value="cakes">Cakes</option>
              <option value="chocolates">Chocolates</option>
              <option value="cookies">Cookies</option>
              <option value="sweets">Sweets</option>
            </select>
          </div>

          <div className="addproduct-itemfield">
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                className={`addproduct-thumbnail ${
                  image ? "preview-image" : "upload-icon"
                }`}
                alt="Upload"
              />
            </label>

            <input type="file" id="file-input" hidden onChange={imageHandler} />
          </div>

          <button onClick={addProduct} className="addproduct-btn">
            ADD PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
