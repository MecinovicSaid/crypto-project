import React from "react";
import "./NavBar.css";

const Navbar = () => {
  return <div className="Navbar">
    <h1 className="logo">Logo</h1>
    <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li> 
    </ul>
    <div className="nav-right">
        <select> 
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
        </select>
        <button>Sign up</button>
    </div>
  </div>;
};

export default Navbar;
