import React from 'react';
import '../styles/AddProductPage.css'

function AddProductPage() {
    return (
        <div>

            <div className='Form'>
               <label>Product Name</label> 
                <input type='text' name='productName' />

                <label>Product Price</label> 
                <input type='text' name='productPrice' />

                <label>Product Description</label> 
                <input type='text' name='productDescription' />

                <button>Add Product</button>
            </div>

        </div>
    );
}

export default AddProductPage;