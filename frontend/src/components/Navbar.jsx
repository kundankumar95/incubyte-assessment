import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useCart } from "../context/CartContext";

import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";

const Navbar = () => {
  const { cartItems } = useCart();

  const [menu, setMenu] = useState("shop");
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const menuRef = useRef(null);
  const dropdown_toggle = (e) => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("nav-menu-visible");
    }
    e.target.classList.toggle("open");
  };

  const isLoggedIn = !!localStorage.getItem("auth-token");
  const userRole = localStorage.getItem("role")?.toUpperCase();
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Sweet Shop</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={logo} 
        alt="menu"
      />

      <ul ref={menuRef} className="nav-menu">
        {
          <>
            <li onClick={() => setMenu("shop")}>
              <Link to="/">All Sweets</Link>
              {menu === "shop" && <hr />}
            </li>

            <li onClick={() => setMenu("sweets")}>
              <Link to="/category/sweets">Sweets</Link>
              {menu === "sweets" && <hr />}
            </li>

            <li onClick={() => setMenu("cakes")}>
              <Link to="/category/cakes">Cakes</Link>
              {menu === "cakes" && <hr />}
            </li>

            <li onClick={() => setMenu("chocolates")}>
              <Link to="/category/chocolates">Chocolates</Link>
              {menu === "chocolates" && <hr />}
            </li>

            <li onClick={() => setMenu("cookies")}>
              <Link to="/category/cookies">Cookies</Link>
              {menu === "cookies" && <hr />}
            </li>
          </>
        }
        {userRole === "ADMIN" && (
          <li onClick={() => setMenu("admin")}>
            <Link to="/admin">Admin</Link>
            {menu === "admin" && <hr />}
          </li>
        )}
      </ul>

      <div className="nav-login-cart">
        {isLoggedIn ? (
          <>
            {userRole !== "ADMIN" && (
              <>
                <Link to="/cart" className="cart-icon">
                  <img src={cart_icon} alt="cart" />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
                <div className="nav-cart-count">{}</div>
              </>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                localStorage.removeItem("role");
                window.location.replace("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
