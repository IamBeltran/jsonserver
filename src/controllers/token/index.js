//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATHS MODULES.  ]────────────────────────────────────────────────────────────────
const services = resolveApp('src/services');

//  ──[ MODULES.  ]──────────────────────────────────────────────────────────────────────
const service = require(services);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { ServerError, handleToken, getHTTPStatusText } = service;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { isValidToken } = handleToken;
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @name          hasProperty
 * @description   Shortcut to hasOwnProperty of the Object method
 * @param         {Object} object - The object to which the property is sought
 * @param         {string} property - The name of the property to look for
 * @returns       {boolean} Returns a boolean indicating whether the object has the specified property.
 */
function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = async (req, res, next) => {
  try {
    if (req.originalUrl !== '/auth/token') {
      throw new ServerError('URL_WRONG');
    }

    //* Method POST
    if (req.method === 'POST') {
      const hasToken = hasProperty(req.body, 'token');
      const token = hasToken ? req.body.token : null;
      const tokenIsValid = hasToken && (await isValidToken(token));

      if (!hasToken) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Not has token in the request',
          error: 'NOT_HAS_TOKEN',
        });
      }

      if (!tokenIsValid) {
        res.status(401).json({
          success: false,
          status: 401,
          'status-text': getHTTPStatusText('401'),
          'response-time': req.requestTime,
          message: 'Invalid token or has expired',
          error: 'TOKEN',
        });
      } else {
        res.status(200).json({
          success: true,
          status: 200,
          'status-text': getHTTPStatusText('200'),
          'response-time': req.requestTime,
          message: 'Token is valid',
          data: null,
        });
      }
    } else {
      res.status(200).json({
        success: true,
        status: 200,
        'status-text': getHTTPStatusText('200'),
        'response-time': req.requestTime,
        message: null,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};
