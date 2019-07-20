//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const getHTTPStatusText = require('./gethttpstatustext');
const handleToken = require('./handletoken');
const handleUsers = require('./handleusers');
const logger = require('./logger');
const ServerError = require('./servererror');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const services = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
services.getHTTPStatusText = getHTTPStatusText;
services.handleToken = handleToken;
services.handleUsers = handleUsers;
services.logger = logger;
services.ServerError = ServerError;
