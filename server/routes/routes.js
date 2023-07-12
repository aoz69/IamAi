const express = require('express');
const router = express.Router();
const index = require("../controllers/index");
const admin = require("../controllers/admin");
const save = require("../controllers/save");
const dbcon = require("../controllers/dbcon");

router.get("/", index.index);

dbcon.connect();
router.get('/admin', admin.adminPage);
router.post('/categoryModel', save.insertCategory);

 

module.exports = router;