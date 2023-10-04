import React, { useState, useEffect } from 'react';
import '../../styles/header/header.css';

function Header({ cartItemCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Use useEffect to update the cartItemCount based on local storage
  useEffect(() => {
    // Retrieve the JSON string from localStorage
    const jsonString = localStorage.getItem('cartItems'); // Replace 'yourKey' with the actual key you are using
  
    // Parse the JSON string to an array of objects
    const savedCartItems = JSON.parse(jsonString);
  
    // Calculate the total quantity by summing up the 'quantity' property of all items
    const totalQuantity = savedCartItems.reduce((total, item) => total + item.quantity, 0);
  
    // Set the total quantity in cartCount state
    setCartCount(totalQuantity);
  }, []);  
  
  

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
          <li><a href="/add-product">Add Product</a></li>
          <li><a href="/cart">Cart ({cartCount})</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
