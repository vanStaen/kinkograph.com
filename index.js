const express = require("express");
const path = require("path");
const cors = require(`cors`)

const db = require("./models");
const isAuth = require("./middleware/isAuth");
const cookieSession = require("./middleware/cookieSession");
const redirectTraffic = require("./middleware/redirectTraffic");

const PORT = process.env.PORT || 5009;
require("dotenv/config");

// Init Express
const app = express();

// Redirect www trafic to root
app.set("trust proxy", true);
app.use(redirectTraffic);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Cookie Middleware
app.use(cookieSession);

// Authorization Middleware
app.use(isAuth);

// Allow cross origin request
app.use(function (req, res, next) {
  let corsOptions = {};
  if ((req.get('host') === 'localhost:5009')) {
    corsOptions = {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
    }
  } else {
    corsOptions = {
      origin: [
        'https://www.kinkograph.com',
        'https://kinkograph.com',
        'http://kinkograph.herokuapp.com',
        'https://kinkograph.herokuapp.com',
      ],
      credentials: true,
      optionsSuccessStatus: 200
    }
  }
  cors(corsOptions)(req, res, next);
})

// Sync sequelize
db.sequelize.sync();

// Router to API endpoints
app.use('/user', require('./api/controller/userController'))
app.use("/auth", require("./api/controller/authController"));

//app.use("/pictures", require("./api/pictures"));
//app.use("/tags", require("./api/tags"));
//app.use("/admin", require("./api/admin"));


// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html")); });

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
