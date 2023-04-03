const { default: mongoose, Schema } = require("mongoose");


const userModel = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    pass:{
        type: String,
        require:true
    }
});


module.exports.userModel = mongoose.model('User' , userModel);