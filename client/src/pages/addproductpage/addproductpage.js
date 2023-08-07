import React, { useState } from 'react';
import Axios from 'axios';
import '../../styles/addproductpage/addproductpage.css';
import AddedProducts from '../../components/addedproducts/addedproducts';

function AddProductPage() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);


    const addProduct = () => {
        Axios.post('http://localhost:3001/api/insert', {
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productImage: productImage
        }).then((response) => {
            console.log('Product added successfully:', response.data);
            window.location.reload();
            // Reset form fields
            setProductName('');
            setProductPrice('');
            setProductDescription('');
            setProductImage(null);
        })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    }

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setProductImage(selectedImage);
    };


    return (

        <div className='addProductPage'>

            <div className='Form'>
                <label>Product Name</label>
                <input type='text' name='productName' onChange={(e) => { setProductName(e.target.value) }} />

                <label>Product Price</label>
                <input type='number' name='productPrice' onChange={(e) => { setProductPrice(e.target.value) }} />

                <label>Product Description</label>
                <input type='text' name='productDescription' onChange={(e) => { setProductDescription(e.target.value) }} />

                <label>Product Image</label>
                <input type="file" name='productImage' accept="image/*" onChange={handleImageChange} />

                <button onClick={addProduct}>Add Product</button>


            </div>

            <AddedProducts />
        </div>
    );
}

export default AddProductPage;