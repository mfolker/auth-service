'use strict';

//TODO: Start using ES6 convensions

//Imports
const express = require('express');
const log4js = require('log4js');
const httpContext = require('express-http-context');
const logging = require('./logging');
const uuidv4 = require('uuid/v4');

// Constants
const PORT = 8171;
const HOST = '0.0.0.0';

//Logging
logging.configure();
const logger = log4js.getLogger('startup');

// App
const app = express();

app.use(httpContext.middleware);
app.use((req, res, next) => {
    httpContext.set('correlation-id', uuidv4());
    next();
});

app.get('/', (req, res) => {
    logger.info("Hello world requested.")
    res.send('Hello World');
});

app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);