import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


function ProductList({ products }) {


    const deleteProduct = (id) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
            // this only runs on success
            console.log("RESPONSE FROM POST", response.data);
        }, (err) => {
            // this only runs on error
            console.log("Error While Posting Data", err);
        });
    }



    return (
        <div>
            {products.map((val) => {
                return <div key={val.id}>
                    <p>{val.productName}</p>
                    <p>{val.productPrice}</p>
                    <p>{val.productDescription}</p>
                    <br />

                    <Link to={"/update-product/" + val.id}><button>Uppdate</button></Link>

                    <button onClick={() => { deleteProduct(val.id) }}>Delete</button>
                </div>
            })}
        </div>
    );

}

export default ProductList;
