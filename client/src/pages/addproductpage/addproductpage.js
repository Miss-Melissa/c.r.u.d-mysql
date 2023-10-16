import React, { useState } from 'react';
import Axios from 'axios';
import '../../styles/addproductpage/addproductpage.css';
import AddedProducts from '../../components/addedproducts/addedproducts';
import { Link } from 'react-router-dom';

function AddProductPage() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);


    const addProduct = () => {

        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        console.log('Data being sent:', {
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productImage: productImage
        });


        Axios.post('http://localhost:3001/api/insert', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res)

                if (res.status === 201) {
                    window.location.reload(); // Reload the window if the delete was successful
                    console.log('Product added successfully');
                } else {
                    console.log('Product not added:', res.data.message);
                }
            })
            .catch((error) => {
                console.log('Error adding product:', error);
            });
    }



    return (
        <div className='addProductPage'>
            <h2>Add Products</h2>
            <button><Link to="/logout">Logout</Link></button>

            <div className='Form'>
                <label>Product Name</label>
                <input type='text' name='productName' onChange={(e) => { setProductName(e.target.value) }} />

                <label>Product Price</label>
                <input type='number' name='productPrice' onChange={(e) => { setProductPrice(e.target.value) }} />

                <label>Product Description</label>
                <input type='text' name='productDescription' onChange={(e) => { setProductDescription(e.target.value) }} />

                <label>Product Image</label>
                <input type="file" name='productImage' accept="image/*" onChange={(e) => { setProductImage(e.target.files[0]) }} />

                <button onClick={addProduct}>Add Product</button>


            </div>

            <div>
                <AddedProducts />
            </div>

        </div>
    );
}

export default AddProductPage;