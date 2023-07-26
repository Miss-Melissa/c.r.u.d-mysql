import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateProductPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const { id } = useParams();
  console.log({ id })

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/${id}`)
      .then(response => {
        const productname = response.data.productName;
        const productprice = response.data.productPrice;
        const productdescription = response.data.productDescription;

        setProductName(productname);
        setProductPrice(productprice);
        setProductDescription(productdescription);

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




  return (
    <div>
      <form>
        <input type="text" name="productname" value={productName} onChange={setName} />
        <br />
        <input type="number" name="productprice" value={productPrice} onChange={setPrice} />
        <br />
        <input type='text' name='productdescription' value={productDescription} onChange={setDesc} />
      </form>

    </div>
  );

}

export default UpdateProductPage;
