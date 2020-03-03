const httpContext = require('express-http-context');
const uuidv4 = require('uuid/v4');

const logging = require('./logging');

module.exports = function(app){

    //HTTP Context and correlation id middleware
    app.use(httpContext.middleware);
    app.use((req, res, next) => {
        httpContext.set(logging.correlationIdContextKey, uuidv4());
        next();
    });
	
};