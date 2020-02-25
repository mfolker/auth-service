module.exports = (app) => {
	app.get('/', (req, res) => {
		logger.info('Hello world requested.');
		res.send('Hello World');
	});
};
