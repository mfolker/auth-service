'use strict';

//TODO: Start using ES6 convensions

//Imports
const express = require('express');
const log4js = require('log4js');
const httpContext = require('express-http-context');
const uuidv4 = require('uuid/v4');
const path = require('path');
const { Provider } = require('oidc-provider');

const logging = require('./logging');
//Move out into an initialiser class.
const createClientsTable = require('./database/createClientsTable');

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
	httpContext.set(logging.correlationIdContextKey, uuidv4());
	next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	logger.info('Hello world requested.');
	res.send('Hello World');
});

app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);
