import React from 'react';
import { useCart } from '../cartcontext/cartcontext';
import CartItem from '../cartitem/cartitem';
import { Link } from 'react-router-dom';

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
        <div>
        <p>Cart is empty</p>
        <br />
        <button><Link to="/products">Continue shopping</Link></button>
        </div>
      
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <p>Total Price: ${totalCartPrice.toFixed(2)}</p>
          <br />
          <button><Link to="/products">Continue shopping</Link></button>
          <button><Link to="/products">Checkout</Link></button>

        </div>
      )}
    </div>
  );
}

export default Cart;
