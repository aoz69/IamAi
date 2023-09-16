const express = require('express');
const router = express.Router();
const index = require("../controllers/index");
const admin = require("../controllers/admin");
const save = require("../controllers/save");
const dbcon = require("../controllers/dbcon");
const fetch = require("../controllers/fetch");
const del = require('../controllers/delete');
const status = require('../controllers/qrScan')
const { userModel, productModel, categoryModel, notificationModel } = require('../models/dbModel');


router.get("/", index.index);

dbcon.connect();
router.get('/admin', admin.adminPage);
router.get('/fetchCateNumb', fetch.fetchCategory);
router.get('/fetchProductNumb', fetch.fetchProductNumb);
router.get('/fetchProducts', fetch.fetchProducts);
router.get('/fetchCate', fetch.fetchCate);


router.get('/rev', fetch.fetchRev);
router.get('/stockCount', fetch.fetchStockCount);
router.get('/stock', fetch.fetchProductStock);

router.get('/lowstockCount', fetch.lowstockCount);
router.get('/archivedCount', fetch.archivedCount);
router.get('/inStockCount', fetch.inStockCount);
router.get('/soldCount', fetch.soldCount);

router.get('/fetchLowStock', fetch.fetchLowStock);
router.get('/fetchArchived', fetch.fetchArchived);
router.get('/fetchInStock', fetch.fetchInStock);
router.get('/fetchSold', fetch.fetchSold);
router.get('/fetchProductById/:productId', fetch.fetchProductById);
router.get('/fetchCategoryById/:categoryId', fetch.fetchCategoryById);

router.get('/user', fetch.fetchUsers);
router.get('/fetchNotifi', fetch.fetchNotifi);
router.get('/getSession' , index.getSession)
router.post('/logout', index.logout);

// POST REQUESTS
router.post('/addUser', save.insertUsers);
router.post('/addNotfi', save.insertNotfication);
router.post('/checkUser' , index.checkUser);
router.post('/addProduct', save.insertProducts);
router.post('/CateModel', save.insertCategory);

router.put('/updateUser/:userId', save.updateUser);
router.put('/updateProduct/:productId', save.updateProduct);
router.put('/updateCategory/:categoryId', save.updateCategory);
// router.put('/changeStatus/:productId',status.changeStatus);




// Change product status to "sale"
router.put('/changeStatus/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedStatus = 'sold';

    // Find the product by ID and update its status
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { status: sale },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/delete/product/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await del.deleteResource('product', productId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  router.delete('/delete/category/:categoryId', async (req, res) => {
    try {
      const { categoryId } = req.params;
      const result = await del.deleteResource('category', categoryId);
      await productModel.deleteMany({category: categoryId})
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  router.delete('/delete/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await del.deleteResource('user', userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

module.exports = router;