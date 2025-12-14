import React from "react";
import "../../styles/admin.css";


const EditProduct = ({ editingProduct, setEditingProduct, handleUpdate }) => {
  if (!editingProduct) return null;

  return (
    <div className="edit-overlay">
      <div className="edit-form">
        <h3>Edit Product</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={editingProduct.name}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={editingProduct.price}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={editingProduct.category}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={editingProduct.stock}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, stock: e.target.value })
          }
        />

        <div className="edit-actions">
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="cancel-btn"
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
