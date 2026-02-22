import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3>AmazonGo</h3>
        <p>AI Powered Smart Shopping Platform</p>
      </div>

      <div>
        <p>© {new Date().getFullYear()} AmazonGo</p>
        <p>Final Year Project | MERN + ML</p>
      </div>
    </footer>
  );
};

export default Footer;