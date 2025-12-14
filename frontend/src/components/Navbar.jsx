import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();  

  const [menu, setMenu] = useState("shop");
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const menuRef = useRef(null);
  const dropdown_toggle = (e) => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("nav-menu-visible");
    }
    e.target.classList.toggle("open");
  };

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

        
        {user?.role === "admin" && (
          <li onClick={() => setMenu("admin")}>
            <Link to="/admin">Admin</Link>
            {menu === "admin" && <hr />}
          </li>
        )}
      </ul>

      <div className="nav-login-cart">
        {user ? (
          <>
            {user.role !== "admin" && (
              <Link to="/cart" className="cart-icon">
                <img src={cart_icon} alt="cart" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            )}

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

