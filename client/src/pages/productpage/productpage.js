import React, { useEffect, useState } from 'react';
import Product from '../../components/product/product';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
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
        <Product product={product} addToCart={addToCart} />
      )}
    </div>
  );
}

export default ProductPage;
