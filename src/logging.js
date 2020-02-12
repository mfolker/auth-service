'use strict';

const log4js = require('log4js');
const httpContext = require('express-http-context');

const correlationIdContextKey = "correlation-id";

const configure = () =>  {
  //Add in different options for debug, production

  log4js.configure({
    appenders: {
      console: { 
        type: 'console', 
        layout: { 
          type: 'pattern',
          pattern: '%[ [%d] %] %p %c %z %x{correlationId} - %m%n',
          tokens: {
            correlationId: function(logEvent) {
              return httpContext.get(correlationIdContextKey);
            }
          }
        }
      }
    },
    categories: {
      default: { appenders: ['console'], level: 'trace', enableCallStack : true }
    }
  });

}

exports.configure = configure;
exports.correlationIdContextKey = correlationIdContextKey;