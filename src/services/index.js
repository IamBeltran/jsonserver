//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const ServerError = require('./servererror').default;
const HTTP_STATUS_CODE = require('./servererror');
const handleUsers = require('./handleusers');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const services = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
services.HTTP_STATUS_CODE = HTTP_STATUS_CODE;
services.ServerError = ServerError;
services.handleUsers = handleUsers;
