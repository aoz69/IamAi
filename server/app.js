require('dotenv').config();

const express = require("express");
const session = require('express-session');
const app = express();
const home = require("./routes/routes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ip = "localhost";
const sessionSecret = process.env.SESSION_SECRET || 'default_secret';
const port = process.env.PORT || 3100;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const helmet = require('helmet');


app.use(express.json()); //this is the build in express body-parser
app.use(
  //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
  );
  
  app.use(session({
    name: 'thisIsWow',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  }));
  
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors({ origin: corsOrigin, credentials: true })); // sets correct headers so cors can communicate 


app.use(home);
app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});