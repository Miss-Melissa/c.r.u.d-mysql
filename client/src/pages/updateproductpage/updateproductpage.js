import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateProductPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');


  const { id } = useParams();
  console.log({ id })

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/${id}`)
      .then(response => {
        console.log(response)
        setProductName(response.data.productName);
        setProductPrice(response.data.productPrice);
        setProductDescription(response.data.productDescription);
      }, (err) => {
        console.log("Error While Posting Data", err);
      });
  }, [id]);


  const setName = (e) => {
    setProductName(e.target.value)
  }

  const setPrice = (e) => {
    setProductPrice(e.target.value)
  }

  const setDesc = (e) => {
    setProductDescription(e.target.value)
  }

  const navigate = useNavigate();

  const updateProduct = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:3001/api/update/${id}`, {
      productName,
      productPrice,
      productDescription,
    })
      .then((res) => {
        if (res.data.updated) {
          console.log('Product updated successfully');
          navigate('/add-product')
        } else {
          console.log('Product not updated');
        }
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });

  };

  return (
    <div>
      <input type="text" name="productName" value={productName} onChange={setName} />
      <br />
      <input type="number" name="productPrice" value={productPrice} onChange={setPrice} />
      <br />
      <input type='text' name='productDescription' value={productDescription} onChange={setDesc} />
      <br />
      <button onClick={updateProduct}>Update</button>
      <Link to="/add-product"><button>Go back</button></Link>
    </div>
  );

}

export default UpdateProductPage;
