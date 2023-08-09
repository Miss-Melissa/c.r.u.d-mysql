const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop-db'
});

db.connect((error) => {
    if (error) throw error;
    console.log('Connected to the database');
});

module.exports = db;
