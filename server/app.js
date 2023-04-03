
const express = require("express");
const app = express();
const port = 3000;
const home = require("./routes/routes")

app.use(home);


app.listen(port);
console.log("Server live at port: " + port)