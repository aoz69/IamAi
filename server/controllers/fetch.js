const dbModel = require('../models/dbModel');



exports.fetchUsers = async (req, res) => {
    const users = await dbModel.userModel
        .find({})
        .populate();
    res.json({ "data": users });
};

//only gets name and id of user-----------> ME FUNCTION
exports.fetchUsersName = async (req, res) => {
    if (req.session.userName) {
        return res.json({ id: req.session.userId, userName: req.session.userName, role:req.session.userRole});
    } else {
        return res.json({ error: "Not Logged In" });
    }
};


exports.fetchCategory = async (req, res) => {
    const categories = await dbModel.categoryModel
    .find({})
    .populate();
    res.json({ "all category data": categories });
};

exports.fetchProduct = async (req, res) => {
    const product = await dbModel.productModel
    .find({})
    .populate();
    res.json({ "all product data": product });
};


exports.fetchProductByCategory = async(req,res,category) =>{
    const products = await dbModel.productModel
    .find({catrory : {category}})
    .populate();
    res.json({ "Products under  + {category}": products });
}