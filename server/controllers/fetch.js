const dbModel = require('../models/dbModel');
const dbcon = require('./dbcon');
const session = require('express-session');



exports.fetchUsers = async (req, res) => {
    try {
        const users = await dbModel.userModel
            .find({})
        res.json({ "data": users });


    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};

exports.fetchNotifi = async (req, res) => {
    try {
        const data = await dbModel.notificationModel
            .find({})
        res.json({ "notifi": data });


    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
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
    const products = await dbModel.productModel
        .find({ catrory: { category } })
        .populate();
    res.json({ "productsOfCtagegoy": products });
};


exports.fetchProductById = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const product = await dbModel.productModel.findById(productId).exec();
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ product });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.fetchProducts = async (req, res) => {
    const products = await dbModel.productModel
        .find({})
        .populate();
    res.json({ "products": products });
};

exports.fetchCate = async (req, res) => {
    const cates = await dbModel.categoryModel
        .find({})
        .populate();
    res.json({ "category": cates });
};


exports.fetchCategoryById = async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const category = await dbModel.categoryModel.findById(categoryId).exec();
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ category });
    } catch (error) {
      console.error('Error fetching Category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.fetchRev = async (req, res) => {
    const products = await dbModel.productModel.find({}, 'price');
    const totalPrice = products.reduce((sum, product) => {
        return sum + parseFloat(product.price);
    }, 0);
    res.json({ "TotalRev": totalPrice });
};


exports.fetchStockCount = async (req, res) => {
    const products = await dbModel.productModel.find({}, 'stock_Count');
    const stock = products.reduce((sum, product) => {
        return sum + parseFloat(product.stock_Count);
    }, 0);
    res.json({ "totalStock": stock });
};

exports.fetchProductStock = async (req, res) => {
    const stockCnt = await dbModel.productModel
        .find({})
    res.json({ "stock": stockCnt });
};


exports.inStockCount = async (req, res) => {
    const inStock = await dbModel.productModel.countDocuments({ status: 'instock' });;
    res.json({ "stock": inStock });
};
exports.lowstockCount = async (req, res) => {
    const activeCount = await dbModel.productModel.countDocuments({ status: 'lowStock'});;
    res.json({ "lowstock": activeCount });
};

exports.soldCount = async (req, res) => {
    const activeCount = await dbModel.productModel.countDocuments({ status: 'sold' });;
    res.json({ "soldStock": activeCount });
};

exports.archivedCount = async (req, res) => {
    const activeCount = await dbModel.productModel.countDocuments({ status: 'archived' });;
    res.json({ "archived": activeCount });
};


exports.fetchLowStock = async (req, res) => {
    const productsInStock = await dbModel.productModel.find({
    $or: [{ status: 'lowStock' }, { status: 'lowstock' }]});
    res.json({ products: productsInStock });
};

exports.fetchArchived = async (req, res) => {
    const productsInStock = await dbModel.productModel.find({ status: 'archived' });
    res.json({ products: productsInStock });
};

exports.fetchInStock = async (req, res) => {
    const productsInStock = await dbModel.productModel.find({ status: 'instock' });
    res.json({ products: productsInStock });
};

exports.fetchSold = async (req, res) => {
    const productsInStock = await dbModel.productModel.find({ status: 'sold' });
    res.json({ products: productsInStock });
};
