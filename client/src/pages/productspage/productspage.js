import React from 'react';
import Products from '../../components/products/products';
import { useCart } from '../../components/cartcontext/cartcontext'; // Import the useCart hook

function ProductsPage() {
  const { addToCart, incrementItem, decrementItem } = useCart(); // Use the useCart hook to access cart-related functions

  return (
    <div>
      <h2>Products</h2>
      <br />
      <Products addToCart={addToCart} incrementItem={incrementItem} decrementItem={decrementItem} />
    </div>
  );
}

export default ProductsPage;
