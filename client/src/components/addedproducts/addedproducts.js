import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import AddedProductList from '../addedproductlist/addedproductList';

function AddedProducts() {
    const [productList, setProductList] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setProductList(response.data);
        });
    }, []);


    return (
        <div>
            <AddedProductList productList={productList} />
        </div>
    );
}


export default AddedProducts;
