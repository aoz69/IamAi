const { default: mongoose, Schema } = require("mongoose");


const userModel = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require:true
    }
});

const productModel = new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type: String
    },
    stock_Count:{
        type:Number
    },
    barcodeId:{
        type: Schema.Types.ObjectId,
        ref: "barcode",
      },
    status:{
        type: String,
        required: true,
        enum: ["instock", "lowstock"],
        default: "active",
    }, 
    category:{
        type: Schema.Types.ObjectId,
        ref: "category"
    }
});


const categoryModel = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});


module.exports.userModel = mongoose.model('User' , userModel);
module.exports.productModel = mongoose.model('Products' , productModel);
module.exports.categoryModel = mongoose.model('Categories' , categoryModel);
