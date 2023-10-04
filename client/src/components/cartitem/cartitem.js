// CartItem.js
import React from 'react';

function CartItem({ item, removeFromCart }) {
  return (
    <li>
      {item.productName} - ${item.productPrice}
      <button onClick={() => removeFromCart(item)}>Remove</button>
    </li>
  );
}

export default CartItem;
