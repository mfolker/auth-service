'use strict';
/**
 * This file dynamo db tables when developing locally. 
 * Tables should be precreated by infrastructure as code when running in the cloud.
 */
const createClientsTable = require('./tables/clientsTable');
const createUsersTable = require('./tables/usersTable');
