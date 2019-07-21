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
const { handleUsers, ServerError, handleToken, getHTTPStatusText } = service;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { isValidUser, searchUser } = handleUsers;
const { createToken } = handleToken;

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
    if (req.method === 'POST') {
      if (req.originalUrl !== '/auth/signin') {
        throw new ServerError('URL_WRONG');
      }

      const hasNickname =
        hasProperty(req.body, 'nickname') &&
        req.body.nickname !== '' &&
        req.body.nickname !== undefined &&
        req.body.nickname !== null;
      const hasPass =
        hasProperty(req.body, 'pass') &&
        req.body.pass !== '' &&
        req.body.pass !== undefined &&
        req.body.pass !== null;
      const nickname = hasNickname ? req.body.nickname : null;
      const pass = hasPass ? req.body.pass : null;

      if (!hasNickname && !hasPass) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Required user and password',
          error: 'ARGUMENTS_EMPTY',
        });
      }

      if (!hasNickname) {
        res.status(400).json({
          success: false,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Required Nickname',
          error: 'ERROR_NICKNAME_NULL',
        });
      }

      if (!hasPass) {
        res.status(400).json({
          success: false,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Required pass',
          error: 'ERROR_PASS_NULL',
        });
      }

      if (!isValidUser({ nickname, pass })) {
        res.status(401).json({
          success: false,
          status: 401,
          'status-text': getHTTPStatusText('401'),
          'response-time': req.requestTime,
          message: 'Invalid nickname or password',
          error: 'ERROR_IN_LOGGIN',
        });
      }

      if (isValidUser({ nickname, pass })) {
        const dataUser = searchUser(nickname);
        const issuer = req.body.origin;
        const tokenUser = createToken(dataUser, issuer);
        const loginUser = {
          nickname: dataUser.nickname,
          role: dataUser.role,
          name: dataUser.name,
          token: tokenUser,
        };
        res.status(200).json({
          success: true,
          status: 200,
          'status-text': getHTTPStatusText('200'),
          'response-time': req.requestTime,
          message: 'Success sign in',
          data: loginUser,
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
