const express = require("express");

const configViewEngine = (app) => {
  app.use(express.static("./public"));
  app.set("view engine", "ejs");
  app.set("views", "./views");
};

module.exports = configViewEngine;
