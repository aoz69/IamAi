const express = require('express');
const router = express.Router();
const index = require("../controllers/index");
const admin = require("../controllers/admin");
const dbcon = require("../controllers/dbcon");


router.get("/", index.index);

dbcon.connect();
router.get('/admin', admin.adminPage);


module.exports = router;