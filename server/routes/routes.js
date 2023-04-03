const express = require('express');
const router = express.Router();
const index = require("../controllers/index");
const admin = require("../controllers/admin");

router.get("/", index.index);

router.get('/admin', admin.adminPage);

module.exports = router;