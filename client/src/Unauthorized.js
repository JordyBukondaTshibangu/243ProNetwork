import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
   <div>
         <h1 className="h1">404 Error Page </h1>
          <section className="error-container">
            <span>4</span>
            <span><span className="screen-reader-text">0</span></span>
            <span>4</span>
          </section>
          <div className="link-container">
            <Link to="/" className="more-link">GO BACK HOME </Link>
          </div>
   </div>
  )
}

export default Unauthorized;