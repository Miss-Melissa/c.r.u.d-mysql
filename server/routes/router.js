const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const multer = require('multer');

const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

const upload = multer({
    storage: imgConfig,
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image')) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
});

router.use('/uploads', express.static('uploads'));


router.use(upload.single('productImage'));


router.post('/api/insert', upload.single('productImage'), (req, res) => {
    try {
        console.log('Received data:', req.body);
        console.log('Received file:', req.file);

        const productName = req.body.productName;
        const productPrice = req.body.productPrice;
        const productDescription = req.body.productDescription;
        const productImage = req.file.filename;

        if (!productName || !productPrice || !productDescription || !productImage) {
            return res.status(422).json({ message: 'Please fill all the details' });
        }

        const sqlInsert = 'INSERT INTO products (productName, productPrice, productDescription, productImage) VALUES (?, ?, ?, ?)';
        const values = [productName, productPrice, productDescription, productImage];

        db.query(sqlInsert, values, (err, result) => {
            if (err) {
                console.error('Error inserting product:', err);
                res.status(500).json({ message: 'Product addition failed' });
            } else {
                console.log('Product added successfully:', result);
                res.status(201).json({ message: 'Product added successfully' });
            }
        });

        console.log('After db.query');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


  
router.put('/api/update/:id', (req, res) => {
    const id = req.params.id;
    const { productName, productPrice, productDescription } = req.body;
    const productImage = req.file ? req.file.filename : null;
  
    console.log('productName:', productName);
    console.log('productPrice:', productPrice);
    console.log('productDescription:', productDescription);
    console.log('productImage:', productImage);
  
    // Check if productName is undefined or an empty string
    if (productName === undefined || productName.trim() === '') {
      return res.status(400).json({ error: 'productName is required' });
    }
  
    // Check if productImage is null, if it is, don't update the productImage field
    const sqlUpdate = productImage
      ? 'UPDATE products SET productName = ?, productPrice = ?, productDescription = ?, productImage = ? WHERE id = ?'
      : 'UPDATE products SET productName = ?, productPrice = ?, productDescription = ? WHERE id = ?';
  
    const values = productImage
      ? [productName, productPrice, productDescription, productImage, id]
      : [productName, productPrice, productDescription, id];
  
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
  

  

module.exports = router;
