
const express = require("express");
const app = express();
const port = 3000;
const home = require("./routes/routes");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

app.use(express.json()); //this is the build in express body-parser
app.use(cors()) // sets correct headers so cors can communicate 
app.use(
  //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);
app.use(home);
app.listen(port);

console.log("Server live at port: " + port)