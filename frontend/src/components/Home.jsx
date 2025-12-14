import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/home.css";

const API_URL = "http://localhost:4000";

const Home = () => {
  const [allSweets, setAllSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const isLoggedIn = !!localStorage.getItem("auth-token");

  const { addToCart } = useCart();

  //  FETCH PRODUCTS
  useEffect(() => {
    fetch(`${API_URL}/api/products/listproduct`)
      .then((res) => res.json())
      .then((data) => {
        setAllSweets(data.products || []);
      });
  }, []);

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



  const displayedSweets = allSweets.filter((sweet) =>
    query ? sweet.name.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <div className="home">
      <div className="search-container">
        <input
          placeholder="Search sweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setQuery(search)}
        />
        <button className="search-btn" onClick={() => setQuery(search)}>
          Search
        </button>
      </div>

      <div className="sweet-grid">
        {displayedSweets.map((sweet) => (
          <div className="sweet-card" key={sweet._id}>
            <img src={sweet.image} alt={sweet.name} />
            <h3>{sweet.name}</h3>
            <p className="price">₹{sweet.price}</p>
            <p className="stock">Available: {sweet.availableQuantity}</p>

            <button
              className="add-cart-btn"
              onClick={() => handleAddToCart(sweet)}
              disabled={sweet.availableQuantity === 0}
            >
              {sweet.availableQuantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
