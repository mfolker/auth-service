'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger('interactions');

const { urlencoded } = require('express');

const body = urlencoded({ extended: false });

module.exports = (app, provider) => {
	const { constructor: { errors: { SessionNotFound } } } = provider;

	function setNoCache(req, res, next) {
		res.set('Pragma', 'no-cache');
		res.set('Cache-Control', 'no-cache, no-store');
		next();
	}

	app.use((req, res, next) => {
		const orig = res.render;
		// you'll probably want to use a full blown render engine capable of layouts
		res.render = (view, locals) => {
			app.render(view, locals, (err, html) => {
				if (err) throw err;
				orig.call(res, '_layout', {
					...locals,
					body: html
				});
			});
		};
		next();
	});

	app.get('/interaction/:uid', setNoCache, async (req, res, next) => {
		logger.info(`GET /interaction/:uid`);

		const { uid, prompt, params, session } = await provider.interactionDetails(req, res);

		logger.info(JSON.stringify(params));

		//TODO: Implement me
	});

	app.post('/interaction/:uid/login', setNoCache, body, async (req, res, next) => {
		logger.info(`POST /interaction/:uid/login`);
		//TODO: Implement me
	});

	app.post('/interaction/:uid/continue', setNoCache, body, async (req, res, next) => {
		logger.info(`POST /interaction/:uid/continue`);
		//TODO: Implement me
	});

	app.post('/interaction/:uid/confirm', setNoCache, body, async (req, res, next) => {
		logger.info(`POST /interaction/:uid/confirm`);
		//TODO: Implement me
	});

	app.get('/interaction/:uid/abort', setNoCache, async (req, res, next) => {
		logger.info(`GET /interaction/:uid/abort`);
		//TODO: Implement me
	});

	app.post('/interaction/:uid/federated', setNoCache, body, async (req, res, next) => {
		logger.info(`POST /interaction/:uid/federated`);
		//TODO: Implement me
	});

	app.use((err, req, res, next) => {
		if (err instanceof SessionNotFound) {
			//TODO: Handle interaction expired / session not found error
		}
		next(err);
	});
};
