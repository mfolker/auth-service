module.exports = (app, provider) => {
	app.get('/error', function(req, res) {
		res.send('Error page');
	});
};
