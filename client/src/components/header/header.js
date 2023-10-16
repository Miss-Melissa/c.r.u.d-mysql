import React, { useState } from 'react';
import '../../styles/header/header.css';
import { useCart } from '../cartcontext/cartcontext'; // Import the useCart hook

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart(); // Access cartItems from the context

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Calculate the cartCount based on the cartItems
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">
        <a className="logo-a" href="/"><h1>My App</h1></a>
      </div>
      <button className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        {isOpen ? '✕' : '☰'} {/* Change button content based on isOpen */}
      </button>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/cart">Cart ({cartCount})</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
