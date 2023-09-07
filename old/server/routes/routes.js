const express = require('express');
const router = express.Router();
const index = require("../controllers/index");
const admin = require("../controllers/admin");
const save = require("../controllers/save");
const dbcon = require("../controllers/dbcon");
const fetch = require("../controllers/fetch");


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

router.get('/user', fetch.fetchUsers);
router.get('/getSession' , index.getSession)

// POST REQUESTS
router.post('/addUser', save.insertUsers);
router.post('/checkUser' , index.checkUser);
router.post('/addProduct', save.insertProducts);
router.post('/CateModel', save.insertCategory);

module.exports = router;