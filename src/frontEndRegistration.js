const express = require("express");
const path = require("path");

module.exports = function(app) {
  app.use(
    "/bootstrap/css",
    express.static(__dirname + "/node_modules/bootstrap/dist/css")
  );
  app.use(
    "/bootstrap/js",
    express.static(__dirname + "/node_modules/bootstrap/dist/css")
  );
  app.use("/public", express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
};
