'use strict';

const log4js = require('log4js');

const configure = () =>  {

  //Add in different options for debug, production
  //Add in correlationID

  log4js.configure({
    appenders: {
      console: { type: 'console' }
    },
    categories: {
      default: { appenders: ['console'], level: 'trace' }
    }
  });

}

exports.configure = configure;