'use strict';

const fs = require('fs');

const deploymentEnvironment = process.env.DEPLOYMENT_ENV.trim();
const rawdata = fs.readFileSync(`./configuration/${deploymentEnvironment}.json`);
const configuration = JSON.parse(rawdata);	

module.exports = configuration;