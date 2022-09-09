import React from "react";
import "../Style/Footer.css";
function Footer() {
  return (
    <div className="footer">
      © {new Date().getFullYear()} All rights reserved for{" "}
      <b aria-label="footer">www.tweet-app.com</b>
    </div>
  );
}

export default Footer;
