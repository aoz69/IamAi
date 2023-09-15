const dbModel = require('../models/dbModel');


const changeStatus = async (req, res) => {
    const productId = req.params.productId;
    const updateData = req.body;

    try {
      const product = await dbModel.productModel.findById(productId);
      if (!product) { 
        return res.status(404).json({ error: "Category not found" });
      }
      product.status = updateData.status;
      await product.save();
  
      res.json({ success: "product updated" });
    } catch (error) {
      console.error("Error updating Product:", error);
      res.status(500).json({ error: "Server error, try again" });
    }
  };

  module.exports = { changeStatus };