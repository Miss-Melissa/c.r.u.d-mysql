import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Products from '../../components/products/products';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      <h2>Products</h2>
      <br />
      {loading ? (
        <p>Loading ...</p>
      ) : (
      <Products products={products}/>
      )}
    </div>
  );
}

export default ProductsPage;
