import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";
import backgroundImage from "/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-overlay">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      </div>
      <div className="footer-content">
        <div className="footer-left">
          <div className="social-icons">
            <Link to={"https://www.facebook.com/share/15okBmdKvv/?mibextid=qi2Omg"}>
              <FaFacebook />
            </Link>
            <Link to={"https://www.instagram.com/brandspark.in?igsh=anlxdTRydjY4bmht"}>
              <FaInstagram />
            </Link>
            <Link to={"https://www.linkedin.com/company/brandspark-in/"}>
              <FaLinkedin />
            </Link>
          </div>
          <p>Or email us at:</p>
          <a href="mailto:brandspark.in@gmail.com">brandspark.in@gmail.com</a>
        </div>
        <nav className="footer-nav">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About Us</Link>
          <Link to={"/services"}>Services</Link>
          <Link to={"/contact"}>Contact</Link>
        </nav>
        <div className="footer-right">
          <p>Office</p>
          <p>Matha Arcade, Pullepady Road</p>
          <p>Opp. St. Mary's Church, Ernakulam</p>
          <a href="tel:+917593974447">+91 7593974447</a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} BrandSpark. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
