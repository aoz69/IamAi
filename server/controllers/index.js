
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
      if (!(await dbcon.connect())) {
        throw "err";
      }
      const user = await model.userModel.findOne({ email }).exec();
      console.log(user);
      if (!user || (!user.admin && adminLogin)) {
        return res.json({ status: "error", error: "invalid user email" });
      } else if (!(await bcrypt.compare(password, user.password))) {
        return res.json({ status: "error", error: "Password is invalid" });
      } else {
        req.session.userName = user.f_name + " " + user.l_name;
        req.session.userId = user._id;
        req.session.email = user.email;
        req.session.admin = user.admin;
        return res.json({
          status: "success",
          username: req.session.userName,
          id: req.session.userId,
        });
      }
      // console.log(session.userName);
    } catch (error) {
      console.log(error);
      res.json({ error: "Server error, try again" });
    }
  };
    
  exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        //good
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
    res.clearCookie("token");
  };