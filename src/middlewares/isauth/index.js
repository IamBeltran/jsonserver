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

//  ──[ REQUIRE MODULES.  ]──────────────────────────────────────────────────────────────
const service = require(services);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { handleToken, getHTTPStatusText } = service;
const { decodeToken } = handleToken;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @name          isType
 * @description   Function that returns the type of value you want to evaluate.
 * @param         {*} value - Value to evaluate
 * @returns       {String} A string with the name of the type of variable evaluated
 */
function isType(value) {
  return Object.prototype.toString
    .call(value)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
}
/**
 * @name          setPublicUrls
 * @description   Function that returns a array with public urls.
 * @param         {string|string[]} publicUrl - Value to evaluate
 * @returns       {string[]} A string with the name of the type of variable evaluated
 */
function setPublicUrls(publicUrl) {
  const urls = [];
  if (isType(publicUrl) === 'array') {
    return urls.concat(publicUrl);
  }
  if (isType(publicUrl) === 'string') {
    urls.push(publicUrl);
    return urls;
  }
  return urls;
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const isAuth = allowUrls => async (req, res, next) => {
  try {
    const url = req.originalUrl;
    const { authorization } = req.headers;
    const publicUrls = setPublicUrls(allowUrls);
    const isUrlProtect = !publicUrls.includes(url);
    const hasToken = authorization !== undefined && authorization.split(' ')[0] === 'Bearer';
    const token = hasToken ? authorization.split(' ')[1] : null;

    if (isUrlProtect && !hasToken) {
      res.status(401).send({
        success: false,
        status: 403,
        'status-text': getHTTPStatusText('401'),
        'response-time': req.requestTime,
        message: 'No tienes autorización',
        error: 'TOKEN',
      });
    }
    if (isUrlProtect && hasToken) {
      await decodeToken(token)
        .then(() => {
          next();
        })
        .catch(response => {
          res.status(response.status).json({
            success: response.success,
            status: response.status,
            'status-text': response['response-time'],
            'response-time': req.requestTime,
            message: response.message,
            error: response.error,
          });
        });
    }
    if (!isUrlProtect) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = isAuth;
