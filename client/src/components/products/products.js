import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


function Products() {
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
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <ul>
       {products.map(product => (
          <li key={product.id}>
            <Link to={"/product/" + product.id}>
           <strong>{product.productName}</strong> 
           <br />
           <img src={`http://localhost:3001/uploads/${product.productImage}`} alt={product.productName} height={250} width={250} />
           <br />
           </Link>
           <strong>{product.productPrice}</strong>
           <br />
           <strong>{product.productDescription}</strong>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}


export default Products;
