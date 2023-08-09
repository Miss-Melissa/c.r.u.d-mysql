const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = require("./routes/router");


require('./db/conn');

const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop-db'
});



app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM products";

    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });

});


  app.get('/api/get/:id', (req, res) => {
    const id = req.params.id;

    const sqlId = 'SELECT * FROM products WHERE id = ?';

   db.query(sqlId, [id], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error fetching product from MySQL' });
      } else {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      }
    });
  });



app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id

    const sqlDelete = "DELETE FROM products WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Delete failed' }); // Send an error response
    } else {
        res.status(200).send({ message: 'Delete successful' }); // Send a success response
    }
    });
});


  
app.put('/api/update/:id', (req, res) => {
  const id = req.params.id;
  const { productName, productPrice, productDescription } = req.body;
  const productImage = req.file ? req.file.filename : null;  // Use req.file instead of req.body.productImage

  console.log('productName:', productName);
  console.log('productPrice:', productPrice);
  console.log('productDescription:', productDescription);

  const sqlUpdate = 'UPDATE products SET productName = ?, productPrice = ?, productDescription = ?, productImage = ? WHERE id = ?';
  const values = [productName, productPrice, productDescription, productImage, id];

  db.query(sqlUpdate, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ updated: false });
    } else {
      console.log('Product updated successfully:', result);
      res.status(200).json({ updated: true });
    }
  });
});





  





app.listen(3001, () => {
    console.log('Running on port 3001!');
});