"use strict";

//Packages
const express = require("express");
const log4js = require("log4js");
const { Provider } = require("oidc-provider");

//Modules
const configuration = require("./config");
const logging = require("./logging");
const middlewareRegistration = require("./middlewareRegistration");
const frontEndRegistration = require("./frontEndRegistration");
const providerConfiguration = require("./providerConfiguration");

//Routes
const interactions = require("./routes/interactions");
const errors = require("./routes/errors");
const home = require("./routes/home");

//Logging
logging.configure();
const logger = log4js.getLogger("startup");

//Database
if (process.env.DEPLOYMENT_ENV.trim() == "local") {
  logger.debug("Running locally, creating database tables");
  require("./database/local_initialisatiion");
}

// App
const app = express();
middlewareRegistration(app);
frontEndRegistration(app);

(async () => {
  //TODO:
  let adapter;
  const provider = new Provider(configuration.app.issuer, {
    adapter,
    ...providerConfiguration
  });

  interactions(app, provider);
  errors(app);
  home(app);
  app.use(provider.callback);

  app.listen(configuration.app.port, configuration.app.host);
  logger.info(`Running on ${configuration.app.issuer}`);
})().catch(err => {
  logger.error(err);
  process.exitCode = 1;
});
