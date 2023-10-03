import React from 'react';

function Product({ product }) {

    return (
        <div>
            <div>
                <h2>{product.productName}</h2>
                <p><strong>Description:</strong> {product.productDescription}</p>
                <p><strong>Price:</strong> ${product.productPrice}</p>
            </div>
        </div>
    );
}

export default Product;
