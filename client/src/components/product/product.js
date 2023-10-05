import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/cartcontext/cartcontext'; // Import the useCart hook
import { Link } from 'react-router-dom';

function Product({ product }) {
  const { addToCart, incrementItem, decrementItem, removeFromCart } = useCart(); // Use the useCart hook to access cart-related functions
  const [localQuantity, setLocalQuantity] = useState(0);

  // Retrieve the product data from local storage
  const storedProducts = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Find the corresponding product in local storage based on its ID
  const storedProduct = storedProducts.find((item) => item.id === product.id);

  // Initialize the quantity based on local storage or default to 0
  useEffect(() => {
    if (storedProduct) {
      setLocalQuantity(storedProduct.quantity);
    }
  }, [storedProduct]);

  const handleIncrement = () => {
    incrementItem(product);
    setLocalQuantity(localQuantity + 1);
  };

  const handleDecrement = () => {
    if (localQuantity > 0) {
      decrementItem(product);
      setLocalQuantity(localQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setLocalQuantity(localQuantity + 1); // Update the local quantity when adding to cart
  };

  useEffect(() => {
    // Check if the local quantity becomes 0, then remove the item from the cart
    if (localQuantity === 0) {
      removeFromCart(product);
    }
  }, [localQuantity]); // Add localQuantity, removeFromCart, and product to the dependency array
  

  return (
    <div>
      <div>
        <h2>{product.productName}</h2>
        <img src={`http://localhost:3001/uploads/${product.productImage}`} alt={product.productName} height={250} width={250} />
        <p><strong>Description:</strong> {product.productDescription}</p>
        <p><strong>Price:</strong> {product.productPrice} kr</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        {localQuantity > 0 && (
          <>
            <button onClick={handleDecrement}>-</button>
            <span>{localQuantity}</span>
            <button onClick={handleIncrement}>+</button>
          </>
        )}
        <br />
        <button><Link to="/products">Go back</Link></button>
      </div>
    </div>
  );
}

export default Product;
