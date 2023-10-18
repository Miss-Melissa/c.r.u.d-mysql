const express = require('express');
const router = new express.Router();
const multer = require('multer');
const productController = require('../controllers/productcontroller/productcontroller');
const userController = require('../controllers/usercontroller/usercontroller');


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


router.use(upload.single('productImage'));


// --- Product --- 

router.get('/api/get', productController.getProduct);

router.get('/api/get/:id', productController.getProductById);

router.post('/api/insert', productController.addProduct);

router.delete('/api/delete/:id', productController.deleteProduct);

router.put('/api/update/:id', productController.updateProduct);


// --- User --- 

router.post('/api/register', userController.registerUser);

router.post('/api/login', userController.loginUser);

router.post('/api/logout', userController.logoutUser);


module.exports = router;
