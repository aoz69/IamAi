const { default: mongoose, connect } = require("mongoose");


exports.connect = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/"
    );
    console.log("Db connected");

    
  } catch (error) {
    console.log("Db Error!"  +error);
    
  }
    
  };
  

  // module.exports = con;