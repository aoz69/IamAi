const { default: mongoose, connect } = require("mongoose");


const con = async (req, res) => {
    await mongoose.connect(
      "mongodb://localhost:27017"
    );
    console.log("Db connected!");
    return true;
  };
  

  module.exports = con;