const express = require("express");
const cors = require("cors");
const fs = require("fs");
const router = express.Router();
require("dotenv").config();
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());

//For set layouts of html view
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
// Routes
fs.readdirSync(__dirname + "/src/routes").forEach(function (file) {
  if (file === "index.js" || file.substr(file.lastIndexOf(".") + 1) !== "js")
    return;
  var name = file.substr(0, file.indexOf("."));
  require("./src/routes/" + name)(app, router);
});
const PORT = process.env.PORT || 1819;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
