import React, { useEffect, useState } from 'react';
import CartItem from '../cartitem/cartitem';

// Function to get cart data from local storage
function getCartDataFromLocalStorage() {
  const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
  return cartData;
}

function Cart({ removeFromCart }) {
  const [cartItems, setCartItems] = useState([]);

  // Use useEffect to load cart data from local storage
  useEffect(() => {
    const cartData = getCartDataFromLocalStorage();
    setCartItems(cartData);
    console.log(cartData)
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))}
      </ul>
    </div>
  );
}

export default Cart;
