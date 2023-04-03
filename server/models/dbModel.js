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
        ref: "address",
      },
    status:{
        type: String,
        required: true,
        enum: ["instock", "lowstock"],
        default: "active",
    }
})


module.exports.userModel = mongoose.model('User' , userModel);