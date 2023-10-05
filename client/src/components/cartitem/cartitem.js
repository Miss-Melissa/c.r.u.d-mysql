import React, { useState, useEffect } from 'react';
import { useCart } from '../cartcontext/cartcontext'; // Update the path to CartContext

function CartItem({ item }) {
  const { removeFromCart, incrementItem, decrementItem } = useCart();
  const [itemTotalPrice, setItemTotalPrice] = useState(item.productPrice * item.quantity);

  useEffect(() => {
    // Check if the item price becomes 0, then remove the item from the cart
    if (itemTotalPrice === 0) {
      removeFromCart(item);
    }
  }, [itemTotalPrice, removeFromCart, item]);

  const handleIncrement = () => {
    incrementItem(item);
    setItemTotalPrice((prevTotal) => prevTotal + item.productPrice);
  };

  const handleDecrement = () => {
    decrementItem(item);
    setItemTotalPrice((prevTotal) => prevTotal - item.productPrice);
  };

  const handleRemove = () => {
    removeFromCart(item);
  };

  return (
    <li>
      {item.productName} - ${itemTotalPrice.toFixed(2)}

      <button onClick={handleDecrement}> - </button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrement}> + </button>

      <button onClick={handleRemove}> Remove </button>
    </li>
  );
}

export default CartItem;
