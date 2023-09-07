
const model = require('../models/dbModel');
const bcrypt  = require('bcrypt');

exports.index = (req,res)=>{
    console.log("this is home");
    res.json({message: "hello this is homepage"});
}


exports.checkUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await model.userModel.findOne({ email }).exec();

    if (!user) {
      console.log("Wrong Email");
      return res.json({ status: "error", error: "No user with that email is registered" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const userData = {
          _id: user.id,
          email: user.email,
          role: user.role,
        };

        req.session.user = userData;
        console.log(req.session.user);
        return res.json({ status: "success", message: "Login successful" });
      } else {
        return res.json({ status: "error", error: "Invalid password" });
      }
    }).catch((error) => {
      console.error(error);
      res.json({ status: "error", error: "Server error, try again" });
    });
  } catch (error) {
    console.error(error);
    res.json({ status: "error", error: "Server error, try again" });
  }
};

  exports.getSession = async(req,res) =>{
    const user = req.session.user;
    if (user) {
      console.log("yes")
        res.json({ status: 'success', user });

    } else {
      console.log("no")

        res.json({ status: 'error', message: 'User data not found in session' });
      }
  }


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

