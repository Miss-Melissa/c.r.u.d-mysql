// CartItem.js
import React from 'react';

function CartItem({ item, removeFromCart, incrementItem, decrementItem }) {
  return (
    <li>
      {item.productName} - ${item.productPrice}
      <button onClick={() => removeFromCart(item)}>Remove</button>
      <button onClick={() => incrementItem(item)}>+</button>
      <span>{item.quantity}</span>
      <button onClick={() => decrementItem(item)}>-</button>
    </li>
  );
}

export default CartItem;
