const dbcon = require('./dbcon');
const model = require('../models/dbModel');
const bcrypt  = require('bcrypt');

exports.index = (req,res)=>{
    console.log("this is home");
    res.json({message: "hello this is homepage"});
}


exports.checkUser = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const adminLogin = req.query.adminLogin || false;
    try {
      const user = await model.userModel.findOne({ email }).exec();
  
      if (!user) {
        console.log("Wrong Email");
        return res.json({ status: "error", error: "no user with that email is registered" });
      }
  
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            console.log(user.password + " this is body pass: " + password);
            // console.log('login Success');
            return res.json({ status: "success", message: "Login successful" });
          } else {
            // console.log("Incorrect Password");
            return res.json({ status: "error", error: "Invalid password" });
          }
        })
        .catch(error => {
          console.log(error);
          res.json({ status: "error", error: "Server error, try again" });
        });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "Server error, try again" });
    }
  };

exports.logout = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          res.json({ success: false });
      } else {
          res.json({ success: true });
      }
  });
  res.clearCookie("token");
};