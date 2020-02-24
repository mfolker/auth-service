module.exports = (app) => {
	app.get('/error', function(req, res) {
		res.send('Error page');
	});
};
