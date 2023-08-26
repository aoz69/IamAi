
const express = require("express");
const session = require('express-session');
const app = express();
const port = 3000;
const home = require("./routes/routes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ip = "192.168.1.76";
// const cookieParser = require("cookie-parser");

app.use(express.json()); //this is the build in express body-parser
app.use(cors()) // sets correct headers so cors can communicate 
app.use(cookieParser());
app.use(
  //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);
app.use(session({
  secret: '1234', // Replace with a secret key
  resave: false,
  saveUninitialized: true,
}));
app.use(home);
app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});