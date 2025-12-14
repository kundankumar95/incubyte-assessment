import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/home.css";

const API_URL = "http://localhost:4000";

const Category = () => {
  const { type } = useParams();
  const { addToCart, cartItems } = useCart();
  const isLoggedIn = !!localStorage.getItem("auth-token");
  const [allSweets, setAllSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  /* FETCH + ADJUST STOCK FROM CART */
  useEffect(() => {
    fetch(`${API_URL}/api/products/category/${type}`)
      .then((res) => res.json())
      .then((data) => {
        let products = data.products || [];

        products = products.map((p) => {
          const cartItem = cartItems.find((c) => c._id === p._id);

          return {
            ...p,
            availableQuantity: p.availableQuantity - (cartItem?.quantity || 0),
          };
        });

        setAllSweets(products);
      });
  }, [type, cartItems]);

  const handleAddToCart = (sweet) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    if (sweet.availableQuantity <= 0) return;

    addToCart(sweet);

    setAllSweets((prev) =>
      prev.map((item) =>
        item._id === sweet._id
          ? { ...item, availableQuantity: item.availableQuantity - 1 }
          : item
      )
    );
  };


  const displayedItems = allSweets.filter((item) =>
    query ? item.name.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <div className="home">
      <h2 style={{ textTransform: "capitalize" }}>{type}</h2>

      <div className="search-container">
        <input
          placeholder={`Search ${type}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setQuery(search)}
        />
        <button onClick={() => setQuery(search)}>Search</button>
      </div>

      <div className="sweet-grid">
        {displayedItems.map((item) => {
          const outOfStock = item.availableQuantity <= 0;

          return (
            <div key={item._id} className="sweet-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="stock">Available: {item.availableQuantity}</p>

              <button
                className="add-cart-btn"
                onClick={() => handleAddToCart(item)}
                disabled={outOfStock}
              >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
