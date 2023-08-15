const dbModel = require('../models/dbModel');
const dbcon = require('./dbcon');



exports.fetchUsers = async (req, res) => {
    try {
        dbcon.connect();
        const users = await dbModel.userModel
            .find({}, 'role password')
            // .populate(); // You might uncomment this if it's necessary

        // Assuming `users` is an array of objects with `role` and `password` fields
        res.json({ "data": users });
        
        dbcon.disconnect();
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};

//only gets name and id of user
exports.fetchUsersName = async (req, res) => {
    // dbcon.connect();
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

exports.fetchProductNumb = async (req, res) => {
    const product = await dbModel.productModel.find({});
    const count = product.length
    res.json({ "productData": count });;
};

exports.fetchProductByCategory = async (req, res, category) => {
    dbcon.connect();
    const products = await dbModel.productModel
        .find({ catrory: { category } })
        .populate();
    res.json({ "productsOfCtagegoy": products });
    dbcon.disconnect();
};

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

exports.fetchProductStock = async (req, res) => {
    dbcon.connect();
    const stockCnt = await dbModel.productModel
        .find({})
    res.json({ "stock": stockCnt });
};


exports.lowstockCount = async (req, res) => {
    dbcon.connect();
    const activeCount = await dbModel.productModel.countDocuments({ status: 'lowstock' });;
    res.json({ "lowstock": activeCount });
};

exports.archivedCount = async (req, res) => {
    dbcon.connect();
    const activeCount = await dbModel.productModel.countDocuments({ status: 'archived' });;
    res.json({ "archived": activeCount });
};

exports.inStockCount = async (req, res) => {
    dbcon.connect();
    const inStock = await dbModel.productModel.countDocuments({ status: 'inStock' });;
    res.json({ "stock": inStock });
};

exports.soldCount = async (req, res) => {
    dbcon.connect();
    const activeCount = await dbModel.productModel.countDocuments({ status: 'sold' });;
    res.json({ "soldStock": activeCount });
};