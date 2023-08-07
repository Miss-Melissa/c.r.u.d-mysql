import React, { useState } from 'react';
import Axios from 'axios';
import '../../styles/addproductpage/addproductpage.css';
import AddProducts from '../../components/addproducts/addproducts';



function AddProductPage() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');


    const addProduct = () => {
        Axios.post('http://localhost:3001/api/insert', {
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription
        }).then((res) => {
            if (res.data.success) {
                console.log('Product added successfully:', res.data);
                // Reset form fields
                window.location.reload();

                setProductName('');
                setProductPrice('');
                setProductDescription('');
              } else {
                console.log('Product not updated');
              }
      
        })
        .catch((error) => {
            console.error('Error adding product:', error);
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

            <AddProducts />

        </div>
    );
}

export default AddProductPage;