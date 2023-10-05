import React, { useEffect, useState } from 'react';
import Product from '../../components/product/product';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../../components/cartcontext/cartcontext'; // Import the useCart hook

function ProductPage() {
  const { id } = useParams();
  const { addToCart, incrementItem, decrementItem } = useCart(); // Use the useCart hook to access cart-related functions
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <h2>Product</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Product product={product} addToCart={addToCart} incrementItem={incrementItem} decrementItem={decrementItem} />
      )}
    </div>
  );
}

export default ProductPage;
