import React from "react";
import { Link } from "react-router-dom";
import CopyIcon2 from "../../images/copy-icon2.png";
import Logo2 from "../../images/c212.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="footy-sec mn no-margin">
        <div className="container">
          <ul>
            <li>
              <Link to="/about" title="">
                About Page
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" title="">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/community-guide-line" title="">
                Community Guidelines
              </Link>
            </li>
            <li>
              <Link to="/about" title="">
                Language
              </Link>
            </li>
            <li>
              <Link to="/" title="">
                Copyright Policy
              </Link>
            </li>
          </ul>
          <p>
            <img src={CopyIcon2} alt="" />
            Copyright 2020 code4kongo
          </p>
          <img className="fl-rgt" src={Logo2} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
