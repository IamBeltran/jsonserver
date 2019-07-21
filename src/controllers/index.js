//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const cookie = require('./cookie');
const signin = require('./signin');
const test = require('./test');
const token = require('./token');
const users = require('./users');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const controllers = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
controllers.cookie = cookie;
controllers.signin = signin;
controllers.test = test;
controllers.token = token;
controllers.users = users;
