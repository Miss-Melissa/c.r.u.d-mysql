import React from 'react';
import { useCart } from '../cartcontext/cartcontext';
import CartItem from '../cartitem/cartitem';

function Cart() {
  const { cartItems } = useCart();

  // Calculate the total price of items in the cart
  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <p>Total Price for All Products: ${totalCartPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
