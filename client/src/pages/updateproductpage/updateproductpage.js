import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateProductPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);


  const { id } = useParams();
  console.log({ id })

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/${id}`)
      .then(res => {
        console.log(res)
        setProductName(res.data.productName);
        setProductPrice(res.data.productPrice);
        setProductDescription(res.data.productDescription);
        setProductImage(res.data.productImage)
      }, (err) => {
        console.log("Error While Posting Data", err);
      });
  }, [id]);

  const navigate = useNavigate();

  const updateProduct = (e) => {
    e.preventDefault();

    console.log('Sending data:', productName, productPrice, productDescription, productImage);

    const formData = new FormData();

    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    formData.append('productImage', productImage);

    Axios.put(`http://localhost:3001/api/update/${id}`, formData)
      .then(res => {
        if (res.data.updated) {
          console.log('Product updated successfully');
          navigate('/add-product');
        } else {
          console.log('Product not updated');
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <br />
      <input type="number" name="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      <br />
      <input type="text" name="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
      <br />
      <br />
      {productImage && (
        <img src={`http://localhost:3001/uploads/${productImage}`} alt="Product" style={{ maxWidth: '100px' }} />
      )}
      <br />
      <input type="file" name="productImage" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} />
      <br />
      <button onClick={updateProduct}>Update</button>
      <Link to="/add-product"><button>Go back</button></Link>
    </div>
  );

}

export default UpdateProductPage;
