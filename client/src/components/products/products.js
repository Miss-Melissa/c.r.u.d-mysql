import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../../components/cartcontext/cartcontext'; // Import the useCart hook

function Products() {
  const { cartItems, addToCart, incrementItem, decrementItem } = useCart(); // Use the useCart hook to access cart-related functions
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
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
          {products.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            const initialQuantity = cartItem ? cartItem.quantity : 0;

            return (
              <li key={product.id}>
                <Link to={'/product/' + product.id}>
                  <strong>{product.productName}</strong>
                  <br />
                  <img
                    src={`http://localhost:3001/uploads/${product.productImage}`}
                    alt={product.productName}
                    height={250}
                    width={250}
                  />
                  <br />
                </Link>
                <strong>{product.productPrice}</strong>
                <br />
                <strong>{product.productDescription}</strong>
                <br />
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => decrementItem(product)}>-</button>
                <span>{initialQuantity}</span>
                <button onClick={() => incrementItem(product)}>+</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Products;
