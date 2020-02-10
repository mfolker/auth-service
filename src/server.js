'use strict';

//TODO: Start using ES6 convensions

//Imports
const express = require('express');
const log4js = require('log4js');

// Constants
const PORT = 8171;
const HOST = '0.0.0.0';

const logging = require('./logging');
logging.configure();

// configure();
const logger = log4js.getLogger('startup');



// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);