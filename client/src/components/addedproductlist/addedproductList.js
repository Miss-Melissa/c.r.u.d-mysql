import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function AddedProductList({ productList }) {

    const deleteProduct = (id) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`).then((res) => {
            // This runs on success
            console.log("RESPONSE FROM DELETE", res.data);
            if (res.status === 200) {
                // Optionally, show a confirmation message to the user
                window.location.reload(); // Reload the window if the delete was successful
            }
        })
            .catch((err) => {
                // This runs on error
                console.log("Error While Deleting Data", err);
            });
    }


    return (
        <div>
            {productList.map((product) => {
                return <div key={product.id}>
                    <img src={`http://localhost:3001/uploads/${product.productImage}`} alt={product.productName} height={250} width={250} />
                    <p>Product name: {product.productName}</p>
                    <p>Product price: {product.productPrice} kr</p>
                    <p>Product description: {product.productDescription}</p>
                    <br />
                    <Link to={"/update-product/" + product.id}><button>Update</button></Link>
                    <button onClick={() => { deleteProduct(product.id) }}>Delete</button>
                </div>
            })}
        </div>
    );
}


export default AddedProductList;
