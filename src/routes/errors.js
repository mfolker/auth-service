const log4js = require("log4js");
const logger = log4js.getLogger("errors");

module.exports = app => {
  app.get("/error", function(req, res) {
    res.send("Error page");
  });
};
