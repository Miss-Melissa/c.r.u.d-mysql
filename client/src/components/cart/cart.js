import React from 'react';
import { useCart } from '../cartcontext/cartcontext';
import CartItem from '../cartitem/cartitem';

function Cart() {
  const { cartItems } = useCart();

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
