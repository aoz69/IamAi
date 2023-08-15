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
router.post('/productModel', save.insertProducts);
router.post('/CateModel', save.insertCategory);
router.get('/rev', fetch.fetchRev);
router.get('/stockCount', fetch.fetchStockCount);
router.get('/stock', fetch.fetchProductStock);
router.get('/lowstockCount', fetch.lowstockCount);
router.get('/archivedCount', fetch.inStockCount);
router.get('/inStockCount', fetch.lowstockCount);
router.get('/soldCount', fetch.soldCount);

router.get('/user', fetch.fetchUsers);
router.post('/addUser', save.insertUsers);



module.exports = router;