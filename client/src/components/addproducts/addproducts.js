import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import AddedProductList from '../addedproductlist/addedproductList';

function AddProducts() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setProductList(response.data);
            console.log(response.data)
        });
    }, []);



    return (
        <div>
            <AddedProductList productList={productList} />
        </div>
    );
}

export default AddProducts;
