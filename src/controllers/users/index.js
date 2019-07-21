/* eslint-disable no-underscore-dangle */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const bcrypt = require('bcryptjs');
const objectid = require('bson-objectid');

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
const { logger, handleUsers, ServerError, getHTTPStatusText } = service;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { existsUser } = handleUsers;
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
      if (req.originalUrl !== '/api/users') {
        throw new ServerError('URL_WRONG');
      }
      const validKeysBody = ['name', 'nickname', 'pass', 'role', 'status'];
      const validKeysRole = ['viewfinder', 'user', 'editor', 'administrator', 'supervisor'];
      const validKeysStatus = ['active', 'inactive', 'locked'];

      const hasName =
        hasProperty(req.body, 'name') &&
        req.body.name !== '' &&
        req.body.name !== undefined &&
        req.body.name !== null;

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

      const hasRole =
        hasProperty(req.body, 'role') &&
        req.body.role !== '' &&
        req.body.role !== undefined &&
        req.body.role !== null;

      const hasStatus =
        hasProperty(req.body, 'status') &&
        req.body.status !== '' &&
        req.body.status !== undefined &&
        req.body.status !== null;

      if (!hasName && !hasNickname && !hasPass && !hasRole && !hasStatus) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Null requests required',
          error: 'ERROR_ARGUMENTS_EMPTY',
        });
      }

      if (!hasName) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Null name, requests required',
          error: 'ERROR_NAME_EMPTY',
        });
      }

      if (!hasNickname) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Null nickname, requests required',
          error: 'ERROR_NICKNAME_EMPTY',
        });
      }

      if (!hasPass) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Null password, requests required',
          error: 'ERROR_PASSWORD_EMPTY',
        });
      }

      if (!hasRole) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Null role, requests required',
          error: 'ERROR_ROLE_EMPTY',
        });
      }

      if (!hasStatus) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Null Status, requests required',
          error: 'ERROR_STATUS_EMPTY',
        });
      }

      if (existsUser(req.body.nickname)) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'User already exists',
          error: 'ERROR_USER_EXISTS',
        });
      }

      /**/
      if (!validKeysRole.includes(req.body.role)) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Invalid input role',
          error: 'ERROR_INVALID_ROLE',
        });
      }

      if (!validKeysStatus.includes(req.body.status)) {
        res.status(400).json({
          success: false,
          status: 400,
          'status-text': getHTTPStatusText('400'),
          'response-time': req.requestTime,
          message: 'Invalid input status',
          error: 'ERROR_INVALID_STATUS',
        });
      }

      Object.keys(req.body).forEach(key => {
        if (!validKeysBody.includes(key)) {
          delete req.body[`${key}`];
        }
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.pass, salt);
      req.body.createdAt = Date.now();
      req.body.pass = hash;
      req.body._id = objectid();

      switch (req.body.role.toUpperCase()) {
        case 'VIEWFINDER':
          req.body.level = 1;
          break;
        case 'USER':
          req.body.level = 3;
          break;
        case 'EDITOR':
          req.body.level = 7;
          break;
        case 'ADMINISTRATOR':
          req.body.level = 15;
          break;
        case 'SUPERVISOR':
          req.body.level = 31;
          break;
        default:
          req.body.level = 1;
          break;
      }

      logger.newUser(req.body);
      next();
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
