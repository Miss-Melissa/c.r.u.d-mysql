const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

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


app.post('/api/insert', (req, res) => {

    const prodctName = req.body.productName
    const productPrice = req.body.productPrice
    const productDescription = req.body.productDescription

    const sqlInsert = "INSERT INTO products (productName, productPrice, productDescription) VALUES (?, ?, ?)"

    db.query(sqlInsert, [prodctName, productPrice, productDescription], (err, result) => {
        console.log(result)
    });

});


app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id

    const sqlDelete = "DELETE FROM products WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
       if (err) console.log(err);
    });
});





app.listen(3001, () => {
    console.log('Running on port 3001!');
});