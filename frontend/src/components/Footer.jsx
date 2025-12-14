import React from "react";
import "../styles/footer.css";
import instagram_icon from "../assets/instagram_icon.png";
import pintester_icon from "../assets/pintester_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>A-1 / Bangalore / India</p>
          <p>+91 9501234567</p>
          <p>sweetshop@gmail.com</p>
        </div>

        {/* Help */}
        <div className="footer-section">
          <h3>Get Help</h3>
          <a href="/">FAQ</a>
          <a href="/">Shipping</a>
          <a href="/">Returns</a>
          <a href="/">Payment Options</a>
        </div>

        {/* Stores */}
        <div className="footer-section">
          <h3>Our Stores</h3>
          <a href="/">Bangalore</a>
          <a href="/">Chennai</a>
          <a href="/">Mumbai</a>
          <a href="/">New Delhi</a>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <img src={pintester_icon} alt="Pinterest" />
            <img src={instagram_icon} alt="Instagram" />
            <img src={whatsapp_icon} alt="WhatsApp" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Sweet Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

