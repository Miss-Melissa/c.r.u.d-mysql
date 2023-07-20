import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ProductList from '../productlist/productList';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setProducts(response.data);
        });
    }, []);

    
    return (
        <div>
           <ProductList products={products} />
        </div>
    );
}

export default Products;
