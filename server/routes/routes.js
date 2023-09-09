const express = require('express');
const router = express.Router();
const index = require("../controllers/index");
const admin = require("../controllers/admin");
const save = require("../controllers/save");
const dbcon = require("../controllers/dbcon");
const fetch = require("../controllers/fetch");
const del = require('../controllers/delete');
const { userModel, productModel, categoryModel } = require('../models/dbModel');




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


router.get('/user', fetch.fetchUsers);
router.get('/getSession' , index.getSession)
router.post('/logout', index.logout);

// POST REQUESTS
router.post('/addUser', save.insertUsers);
router.post('/checkUser' , index.checkUser);
router.post('/addProduct', save.insertProducts);
router.post('/CateModel', save.insertCategory);


// Delete a product by ID
router.delete('/delete/product/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await del.deleteResource('product', productId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Delete a category by ID
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
  
  // Delete a user by ID
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