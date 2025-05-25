import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <h2>MyBrand</h2>
          <p>© {new Date().getFullYear()} MyBrand. All rights reserved.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
