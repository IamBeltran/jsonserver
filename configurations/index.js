/* eslint-disable global-require */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[  UTILS.  ]───────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATH MODULES.  ]─────────────────────────────────────────────────────────────────
const dotenvPath = resolveApp('configuration/dotenv/.env');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const environment = process.env.NODE_ENV;
const allowEnvironments = ['production', 'development', 'test'];
const ConfigServerErrors = {
  NULL_NODE_ENV: 'The environment variable is required but was not specified',
  INVALID_NODE_ENVIRONMEN: 'The ENVIRONMENT variable is not allowed',
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @author        Victor Giovanni Beltrán Rodríguez
 * @version       2.0.0
 * @description   Create a new ConfigServerError
 * @class         ConfigServerError
 * @extends       {Error}
 */
class ConfigServerError extends Error {
  /**
   * @param   {String} [error='Default error message'] - Name of error
   * @param   {Object} addInfo - Additional error information
   */
  constructor(error = 'Default error message', addInfo) {
    super();
    const ERRORS = ConfigServerErrors;
    const message = ERRORS[`${error}`] ? ERRORS[`${error}`] : error;
    this.name = 'ConfigServerError';
    this.message = message;
    const $this = this;
    if (addInfo && Object.entries(addInfo).length !== 0 && addInfo.constructor) {
      Object.getOwnPropertyNames(addInfo).forEach(value => {
        if (value === 'name') {
          $this.originalNameError = addInfo[value];
        } else if (value === 'stack') {
          $this.originalStackError = addInfo[value];
        } else {
          $this[value] = addInfo[value];
        }
      });
    }
  }
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ▶ THROWN ERROR IF NOT SET ENVIRONMENT.
if (!environment) {
  throw new ConfigServerError('NULL_NODE_ENV');
}

//  ▶ THROWN ERROR IF SET INVALID ENVIRONMENT.
if (allowEnvironments.includes(environment)) {
  throw new ConfigServerError('INVALID_NODE_ENVIRONMEN');
}

//  ▶ BUILD ARRAY PATH ENV FILES
const dotenvFiles = [
  `${dotenvPath}.${environment}.local`,
  `${dotenvPath}.${environment}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  environment !== 'test' && `${dotenvPath}.local`,
  dotenvPath,
].filter(Boolean);

//  ▶ BUILD ARRAY PATH ENV FILES SEARCH FILES AND SET VARIABLES
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      }),
    );
  }
});

const SERVER = require('./server');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const configurations = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

//  ▶ MAIN MODULES
configurations.SERVER = SERVER;
