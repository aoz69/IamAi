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
router.get('/fetchProductNumb', fetch.fetchProduct);
router.post('/productModel', save.insertProducts);
router.post('/CateModel', save.insertCategory);
router.get('/rev', fetch.fetchRev);
router.get('/stockCount', fetch.fetchStockCount);



 
module.exports = router;