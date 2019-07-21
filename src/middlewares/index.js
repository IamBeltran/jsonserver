//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const defaults = require('./defaults');
const isAuth = require('./isauth');
const loggerRequest = require('./loggerrequest');
const requestTime = require('./requesttime');
const session = require('./session');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const middlewares = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
middlewares.defaults = defaults;
middlewares.isAuth = isAuth;
middlewares.loggerRequest = loggerRequest;
middlewares.requestTime = requestTime;
middlewares.session = session;
