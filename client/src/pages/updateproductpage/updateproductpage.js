


import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateProductPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [newProductImage, setNewProductImage] = useState(null); // New image to be uploaded
  const [previewImage, setPreviewImage] = useState(null); // Preview image for new image selection

  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/${id}`)
      .then(res => {
        console.log(res);
        setProductName(res.data.productName);
        setProductPrice(res.data.productPrice);
        setProductDescription(res.data.productDescription);
        setProductImage(res.data.productImage);
      })
      .catch(err => {
        console.log('Error While Posting Data', err);
      });
  }, [id]);

  const navigate = useNavigate();

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);

    if (newProductImage) {
      formData.append('productImage', newProductImage);
      try {
        const res = await Axios.put(`http://localhost:3001/api/update/${id}`, formData);
        console.log('Image uploaded successfully:');

        if (res.data.updated) {
          console.log('Product updated successfully');
          navigate('/add-product');
        } else {
          console.log('Product not updated');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  };

  // Update previewImage when newProductImage changes
  useEffect(() => {
    if (newProductImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(newProductImage);
    }
  }, [newProductImage]);

  return (
    <div>
      <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <br />
      <input type="number" name="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      <br />
      <input type="text" name="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
      <br />
      <br />
      {newProductImage ? (
        // Display the preview of the new image
        <img src={previewImage} alt="Preview" style={{ maxWidth: '100px' }} />
      ) : (
        // Display the existing product image if available
        productImage && (
          <img src={`http://localhost:3001/uploads/${productImage}`} alt="Product" style={{ maxWidth: '100px' }} />
        )
      )}
      <br />
      <input type="file" name="newProductImage" accept="image/*" onChange={(e) => setNewProductImage(e.target.files[0])} />
      <br />
      <button onClick={updateProduct}>Update</button>
      <Link to="/add-product"><button>Go back</button></Link>
    </div>
  );
}

export default UpdateProductPage;
