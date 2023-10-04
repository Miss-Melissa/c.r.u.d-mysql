import React from 'react';
import Products from '../../components/products/products';

function ProductsPage({ addToCart }) {
  return (
    <div>
      <h2>Products</h2>
      <br />
      <Products addToCart={addToCart} />
    </div>
  );
}

export default ProductsPage;
