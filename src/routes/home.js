'use strict';

const log4js = require("log4js");
const logger = log4js.getLogger("home");

module.exports = (app) => {
	app.get('/', (req, res) => {
		logger.info('Hello world requested.');
		res.send('Hello World');
	});
};
