//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const morgan = require('morgan');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  MIDDLEWARES HTTP REQUEST LOGGER  ]────────────────────────────────────────────────
const format = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
//  NOTE: Morgan
//        morgan(format, options);
const requestError = morgan(format, {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: process.stderr,
});

const requestSuccess = morgan(format, {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: process.stdout,
});

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const loggerRequest = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
loggerRequest.error = requestError;
loggerRequest.success = requestSuccess;
