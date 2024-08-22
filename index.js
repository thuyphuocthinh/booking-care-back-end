const express = require("express");
const dotenv = require("dotenv");
const appRoutes = require("./routes/index.route");
const viewConfigEngine = require("./config/viewEngine");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const bodyParser = require("body-parser");

// app
const app = express();

// dotenv
dotenv.config();

// connect db
connectDB();

// view engine
viewConfigEngine(app);

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// routes
appRoutes(app);

// listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
