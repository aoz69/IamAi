const { default: mongoose, Schema } = require("mongoose");


const userModel = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
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
    },
    createdAt:{
        type: Date,
        require:true
    },
    updatedAt:{
        type: Date,
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
    status:{
        type: String,
        required: true,
        enum: ["instock", "lowStock", "sold" ,"archived" ],
        default: "instock",
    }, 
    category:{
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    date:{
        type: Date,
    }
});


const categoryModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
});

const notificationModel = new mongoose.Schema({
    data:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    date:{
        type: Date,
        // required: true,
    }
});


module.exports.userModel = mongoose.model('User' , userModel);
module.exports.productModel = mongoose.model('Products' , productModel);
module.exports.categoryModel = mongoose.model('Categories' , categoryModel);
module.exports.notificationModel = mongoose.model('Notifications' , notificationModel);

