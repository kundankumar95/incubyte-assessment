import React from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/cart.css";

const API_URL = "https://incubyte-assessment-1-f38k.onrender.com";

const Cart = () => {
  const { cartItems, totalPrice, decreaseQty } = useCart();
  const { token } = useAuth();

  const handleBuyNow = async () => {
    try {
      for (let item of cartItems) {
        // call purchase API for each quantity
        for (let i = 0; i < item.quantity; i++) {
          await axios.post(
            `${API_URL}/api/sweets/${item._id}/purchase`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }

      alert("Purchase successful!");
      window.location.reload();
    } catch (err) {
      alert("Purchase failed");
    }
  };

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item._id}>
          <img src={item.image} alt={item.name} />

          <div className="cart-details">
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="qty-controls">
              <button onClick={() => decreaseQty(item._id)}>-</button>
              <span>{item.quantity}</span>
            </div>
          </div>

          <div className="cart-subtotal">₹{item.price * item.quantity}</div>
        </div>
      ))}

      <h3>Total: ₹{totalPrice}</h3>

      <button className="buy-btn" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default Cart;

