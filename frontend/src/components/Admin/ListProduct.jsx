import { useEffect, useState } from "react";
import cross_icon from "../../assets/cart_cross_icon.png";
import "../../styles/admin.css";
import EditProduct from "./EditProduct";
import { useAuth } from "../../context/AuthContext";

const API_URL =  "http://localhost:4000";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const { token } = useAuth();

  /* FETCH PRODUCTS */
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/listproduct`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setAllProducts(data.products || data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* REMOVE PRODUCT */
  const removeProduct = async (id) => {
    try {
      await fetch(`${API_URL}/api/products/removeproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      fetchProducts();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  /* UPDATE PRODUCT */
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            name: editingProduct.name,
            price: editingProduct.price,
            category: editingProduct.category,
            availableQuantity: editingProduct.availableQuantity,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEditingProduct(null);
        fetchProducts(); 
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products</h1>

      <div className="listproduct-header">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Category</p>
        <p>Stock</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-body">
        {allProducts.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          allProducts.map((product) => (
            <div key={product._id} className="listproduct-row">
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />

              <p>{product.name}</p>
              <p>₹{product.price}</p>
              <p>{product.category}</p>

              <p>
                {product.availableQuantity === 0 ? (
                  <span className="out-stock">Out of stock</span>
                ) : (
                  product.availableQuantity
                )}
              </p>
              <button
                className="edit-btn"
                onClick={() => setEditingProduct(product)}
              >
                Update
              </button>

              <img
                src={cross_icon}
                alt="Remove"
                className="remove-icon"
                onClick={() => removeProduct(product._id)}
              />
            </div>
          ))
        )}
      </div>
      <EditProduct
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default ListProduct;
