import React, { useState } from 'react';
import '../../styles/header/header.css';



function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <a className="logo-a" href="/"><h1>My App</h1></a>
      </div>
      <button className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        &#9776;
      </button>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/add-product">Add Product</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
