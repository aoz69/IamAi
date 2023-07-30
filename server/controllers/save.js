const dbModel = require('../models/dbModel');
const hashing  = require('bcrypt');
const session = require('express-session');
const dbcon = require('./dbcon');

exports.insertUsers = async (req,res) =>{
    try {
        const pass = await hashing.genSalt(10);
        const hashedPass = await hashing.hash(req.body,password , pass);
    } catch (error) {
        console.log("error " + error);
        return res.json({error : "error occured while hashing password"});
    }
    dbcon.connect();
    const user = new dbModel.userModel({
        name: req.body.name,
        role: req.body.role,
        password: hashedPass
    });

    try {
        const saveUser = await user.save();
        session = req.session;
        session.userName = req.body.f_name + " " + req.body.l_name;
        session._id = user._id;
        res.json({success: "saved"});
        console.log("success");
        dbcon.disconnect();


    } catch (error) {
        res.json({error: "error saving user to dabatase"});
        console.log("error " + error);
        dbcon.disconnect();
    }
}

exports.insertProducts = async (req,res) =>{
    dbcon.connect();
    try {
        const products = new dbModel.productModel({
            name: req.body.name,
            price: req.body.price,
            stock_Count: req.body.stock_Count,
            barcodeId: req.body.barcodeId,
            status: req.body.status,
            category: req.body.category,
        });
        const saveProduct = await products.save();
        res.json({success: "saved"});
        console.log("success");
        // dbcon.disconnect();
        
    } catch (error) {
        res.json({error: "error saving products to dabatase"} + error );
        console.log("error " + error);
        // dbcon.disconnect();
    }
}

exports.insertCategory = async (req, res) => {
    try {
      const name = req.body.name;
  
      if (!name) {
        return res.status(400).json({ error: "Name field is required" });
      }
  
      const category = new dbModel.categoryModel({
        name: name
      });
  
      const saveCategory = await category.save();
      res.json({ success: "Category saved successfully" });
      console.log("Category saved successfully");
    } catch (error) {
      res.status(500).json({ error: "Error saving category to the database", details: error });
    }
  };