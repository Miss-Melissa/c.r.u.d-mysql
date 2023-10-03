import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Products({products}) {

  return (
    <div>
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
    </div>
  );
}


export default Products;
