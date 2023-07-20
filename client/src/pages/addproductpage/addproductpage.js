import React, { useState } from 'react';
import Axios from 'axios';
import Products from '../../components/products/products';
import '../../styles/addproductpage/addproductpage.css'

function AddProductPage({ setProductList, productList }) {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');


    const addProduct = () => {
        Axios.post('http://localhost:3001/api/insert', {
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription
        }).then(() => {
            setProductList([...productList, {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription
            }
            ]);
        });
    }


    return (

        <div className='addProductPage'>

            <div className='Form'>
                <label>Product Name</label>
                <input type='text' name='productName' onChange={(e) => { setProductName(e.target.value) }} />

                <label>Product Price</label>
                <input type='number' name='productPrice' onChange={(e) => { setProductPrice(e.target.value) }} />

                <label>Product Description</label>
                <input type='text' name='productDescription' onChange={(e) => { setProductDescription(e.target.value) }} />

                <button onClick={addProduct}>Add Product</button>
            </div>

            <Products />

        </div>
    );
}

export default AddProductPage;