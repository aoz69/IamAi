const dbModel = require('../models/dbModel');
const hashing  = require('bcrypt');

exports.insertUsers = async (req, res) => {
    
    let hashedPass;
    try {
      let pass = await hashing.genSalt(10);
      hashedPass = await hashing.hash(req.body.password, pass);
    } catch (error) {
      console.log("error " + error);
      return res.json({ error: "error occurred while hashing password" });
    }
    
    let user = new dbModel.userModel({
      name: req.body.name,
      role: req.body.role,
      password: hashedPass,
      email: req.body.email,
    });
  
    try {
      let saveUser = await user.save();
      let session = req.session;
      res.json({ success: "saved" });
      console.log("success");
      
    } catch (error) {
      res.json({ error: "error saving user to database" });
      console.log("error " + error);
      
    }
  };
  

  exports.updateUser = async (req, res) => {
    const userId = req.params.userId; 
    const updateData = req.body;
  
    try {
      const user = await dbModel.userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.name = updateData.name || user.name;
      user.role = updateData.role || user.role;
      user.email = updateData.email || user.email;
      user.password = updateData.password || user.password;

      if (updateData.password) {
        const hashedPass = await hashing.genSalt(10);
        user.password = await hashing.hash(updateData.password, hashedPass);
      }
      await user.save();
  
      res.json({ success: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Server error, try again" });
    }
  };
  

exports.insertProducts = async (req,res) =>{

  let datee = new Date(req.body.date)
  console.log(req.body.date)
  console.log("date: "+ datee)

    try {
        const products = new dbModel.productModel({
            name: req.body.name,
            price: req.body.price,
            stock_Count: req.body.stock_Count,
            barcodeId: req.body.barcodeId,
            status: req.body.status,
            category: req.body.category,
            date: datee,
        });
        await products.save();
        res.json({success: "saved"});
        
    } catch (error) {
        res.json({error: "error saving products to dabatase"} + error );
  console.log(error)


    }
}


exports.insertProducts = async (req,res) =>{

  datee = new Date(req.body.date)
  console.log(req.body.date)
  console.log("date: "+ datee)


    try {
        const products = new dbModel.productModel({
            name: req.body.name,
            price: req.body.price,
            stock_Count: req.body.stock_Count,
            barcodeId: req.body.barcodeId,
            status: req.body.status,
            category: req.body.category,
            date: datee,
        });
        await products.save();
        res.json({success: "saved"});
        
    } catch (error) {
        res.json({error: "error saving products to dabatase"} + error );
        console.log(error)   
    }
}

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updateData = req.body;

  try {
    const product = await dbModel.productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = updateData.name || product.name;
    product.price = updateData.price || product.price;
    product.barcodeId = updateData.barcodeId || product.barcodeId;
    product.category = updateData.category || product.category;
    product.date = updateData.date || product.date;
    product.status = updateData.status || product.status;

    await product.save();

    res.json({ success: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server error, try again" });
  }
};


exports.insertCategory = async (req, res) => {
    
    try {
      const category = new dbModel.categoryModel({
        name: req.body.name,
      });
  
      const saveCategory = await category.save();
      res.json({ success: "Category saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error saving category to the database", details: error });
    }
  };


  
exports.updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const updateData = req.body;

  try {
    const category = await dbModel.categoryModel.findById(categoryId);

    if (!category) { 
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = updateData.name || category.name;
    await category.save();

    res.json({ success: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ error: "Server error, try again" });
  }
};


exports.insertNotfication = async (req, res) => {
  // let datee = new Date(req.body.date)
    
  try {
    const notifi = new dbModel.notificationModel({
      data: req.body.data,
      user: req.body.user,
      // date: datee,
    });

    const saveNotifi = await notifi.save();
    res.json({ success: "Notification saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving notification to the database", details: error });
  }
};