const express = require("express");
const path = require("path");
const isAuth = require("./middleware/is-auth");
const redirectTraffic = require('./middleware/redirectTraffic')

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

// Authorization Middleware
app.use(isAuth);

// Allow cross origin request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Router to API endpoints
app.use("/login", require("./api/login"));
app.use("/user", require("./api/user"));
app.use("/pictures", require("./api/pictures"));
app.use("/tags", require("./api/tags"));
app.use("/admin", require("./api/admin"));

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html")); });

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
