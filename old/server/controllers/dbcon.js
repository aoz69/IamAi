const { default: mongoose, connect } = require("mongoose");


exports.connect = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/"
    );
    console.log("Db connected");

  } catch (error) {
    res.json({error: "error connecting to database"});
    
    console.log("Db Error! "  + error);
    
  }
    
};

exports.disconnect = function(){
  mongoose.connection.close();
} 