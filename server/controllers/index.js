
exports.index = (req,res)=>{
    console.log("this is home");
    res.json({message: "hello this is homepage"});
}