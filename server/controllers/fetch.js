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
        return res.json({ id: req.session.userId, userName: req.session.userName, role: req.session.userRole });
    } else {
        return res.json({ error: "Not Logged In" });
    }

};


exports.fetchCategory = async (req, res) => {
    const categories = await dbModel.categoryModel.find({});
    const count = categories.length;
    res.json({ "categoryData": count });
};

exports.fetchProduct = async (req, res) => {
    const product = await dbModel.productModel.find({});
    const count = product.length
    res.json({ "productData": count });;
};


exports.fetchProductByCategory = async (req, res, category) => {
    dbcon.connect();
    const products = await dbModel.productModel
        .find({ catrory: { category } })
        .populate();
    res.json({ "productsOfCatagegoy": products });
    dbcon.disconnect();
}

exports.fetchBarCode = async (req, res) => {
    dbcon.connect();
    const product = await dbModel.productModel
        .find({}, "barcodeId")
        .populate();
    res.json({ "all product data": product });
};


exports.fetchRev = async (req, res) => {
    dbcon.connect();
    const products = await dbModel.productModel.find({}, 'price');
    const totalPrice = products.reduce((sum, product) => {
        return sum + parseFloat(product.price);
    }, 0);
    res.json({ "TotalRev": totalPrice });
};


exports.fetchStockCount = async (req, res) => {
    dbcon.connect();
    const products = await dbModel.productModel.find({}, 'stock_Count');
    const stock = products.reduce((sum, product) => {
        return sum + parseFloat(product.stock_Count);
    }, 0);
    res.json({ "totalStock": stock });
};