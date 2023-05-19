const dbModel = require('../models/dbModel');
const dbcon = require('./dbcon');



exports.fetchUsers = async (req, res) => {
    dbcon.connect();
    const users = await dbModel.userModel
        .find({})
        .populate();
    res.json({ "data": users });
    dbcon.disconnect();
};

//only gets name and id of user
exports.fetchUsersName = async (req, res) => {
    dbcon.connect();
    if (req.session.userName) {
        return res.json({ id: req.session.userId, userName: req.session.userName, role:req.session.userRole});
    } else {
        return res.json({ error: "Not Logged In" });
    }
   
};


exports.fetchCategory = async (req, res) => {
    dbcon.connect();
    const categories = await dbModel.categoryModel
    .find({})
    .populate();
    res.json({ "all category data": categories });
    dbcon.disconnect();
};

exports.fetchProduct = async (req, res) => {
    dbcon.connect();
    const product = await dbModel.productModel
    .find({})
    .populate();
    res.json({ "all product data": product });
    dbcon.disconnect();
};


exports.fetchProductByCategory = async(req,res,category) =>{
    dbcon.connect();
    const products = await dbModel.productModel
    .find({catrory : {category}})
    .populate();
    res.json({ "Products under  + {category}": products });
    dbcon.disconnect();
}

exports.fetchBarCode = async (req, res) => {
    dbcon.connect();
    const product = await dbModel.productModel
    .find({} , "barcodeId")
    .populate();
    res.json({ "all product data": product });
    dbcon.disconnect();
};


