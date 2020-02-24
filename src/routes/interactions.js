module.exports = (app, provider) => {
	const { constructor: { errors: { SessionNotFound } } } = provider;

	function setNoCache(req, res, next) {
		res.set('Pragma', 'no-cache');
		res.set('Cache-Control', 'no-cache, no-store');
		next();
	}

	app.get('/interaction/:uid', setNoCache, async (req, res, next) => {
		//TODO: Implement me
	});

	app.post('/interaction/:uid/login', setNoCache, body, async (req, res, next) => {
		//TODO: Implemnet me
	});

	app.post('/interaction/:uid/continue', setNoCache, body, async (req, res, next) => {
		//TODO: Implement me
	});

	app.post('/interaction/:uid/confirm', setNoCache, body, async (req, res, next) => {
		//TODO: Implement me
	});

	app.get('/interaction/:uid/abort', setNoCache, async (req, res, next) => {
		//TODO: Implement me
	});

	app.use((err, req, res, next) => {
		if (err instanceof SessionNotFound) {
			//TODO: Handle interaction expired / session not found error
		}
		next(err);
	});
};
