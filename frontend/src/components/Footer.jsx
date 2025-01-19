import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <a href="/" aria-label="Home">
            <img src="/nrabc_logo.svg" alt="Church Logo" className="logo" />
          </a>
        </div>
        <div className="footer-contact">
          <h3 className="footer-section-title">Contact Us</h3>
          <p>Plot 32, Familusi Avenue, Off Joyce B Road, New GRA, Iyaganku</p>
          <p>Ibadan. G.P.O. Box 16489, Ibadan, Oyo State</p>
          <a href="mailto:nrabaptist@gmail.com">📧 nrabaptist@gmail.com</a>
        </div>
        <div className="footer-social">
          <h3 className="footer-section-title">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com/nrabciyagankugraibadan" aria-label="Facebook">
              <img src="/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://x.com/NRABaptistChur" aria-label="X">
              <img src="/X.svg" alt="X" />
            </a>
            <a href="https://instagram.com/nrabaptistchurch/" aria-label="Instagram">
              <img src="/instagram.svg" alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h3 className="footer-section-title">Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/worship">Worship with us</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/ministries">Ministries</a></li>
            <li><a href="/blog">Blogs</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-credits">
          <p>&copy; 2025 NRABC. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
