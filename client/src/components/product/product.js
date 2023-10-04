import React from 'react';

function Product({ product, addToCart }) {

    return (
        <div>
            <div>
                <h2>{product.productName}</h2>
                <img src={`http://localhost:3001/uploads/${product.productImage}`} alt={product.productName} height={250} width={250} />
                <p><strong>Description:</strong> {product.productDescription}</p>
                <p><strong>Price:</strong> {product.productPrice} kr</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Product;
