'use strict';

const log4js = require('log4js');
const httpContext = require('express-http-context');

const configure = () =>  {

  //Add in different options for debug, production
  //Add in correlationID

  log4js.configure({
    appenders: {
      console: { 
        type: 'console', 
        layout: { 
          type: 'pattern',
          pattern: '%[ [%d] %] %p %c %z %x{user} - %m%n',
          tokens: {
            user: function(logEvent) {
              return httpContext.get('correlation-id');
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