'use strict';

//Imports
const express = require('express');
const log4js = require('log4js');
const httpContext = require('express-http-context');
const uuidv4 = require('uuid/v4');
const path = require('path');
const { Provider } = require('oidc-provider');

//Routes
const interactions = require('./routes/interactions');
const errors = require('./routes/errors');
const home = require('./routes/home');

const logging = require('./logging');

//Database
//const createClientsTable = require('./database/createClientsTable'); //Move out into an initialiser class.

const { PORT = 8171, ISSUER = `http://localhost:${PORT}`, HOST = '0.0.0.0' } = process.env;

const configuration = require('./configuration');

//Logging
logging.configure();
const logger = log4js.getLogger('startup');

// App
const app = express();

// Add middleware
app.use(httpContext.middleware);
app.use((req, res, next) => {
	httpContext.set(logging.correlationIdContextKey, uuidv4());
	next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let server;
(async () => {
	//TODO:
	let adapter;

	const provider = new Provider(ISSUER, { adapter, ...configuration });

	interactions(app, provider);
	errors(app);
	home(app);
	app.use(provider.callback);

	app.listen(PORT, HOST);
	logger.info(`Running on ${ISSUER}`);
})().catch((err) => {
	if (server && server.listening) server.close();
	console.error(err);
	process.exitCode = 1;
});
