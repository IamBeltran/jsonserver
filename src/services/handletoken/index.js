/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const jwt = require('jsonwebtoken');

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
const configurations = resolveApp('configurations');

const configuration = require(configurations);
const handleUsers = require('../handleusers');
const HTTP_STATUS_CODE = require('../httpstatuscode');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  SERVER: { SERVER_KEY_API: keyApi, SERVER_BASE_URL: baseUrl },
} = configuration;

const { isValidIdUser } = handleUsers;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const algorithms = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512',
  'none',
];

const issuer = baseUrl;

const options = {
  sign: {
    algorithm: 'HS256',
    expiresIn: '1d',
    noTimestamp: false,
    mutatePayload: false,
  },
  verify: {
    algorithms,
    issuer,
    ignoreExpiration: false,
    ignoreNotBefore: true,
  },
};

const errorsToken = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];

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

/**
 * @typedef       {Object} User
 * @property      {string} nickname - User Nickname
 * @property      {string} role     - User role
 * @property      {string} name     - User name
 * @property      {number} _id      - User id
 * @property      {string} status   - User status
 */

/**
 * @name          createToken
 * @description   Function to create user tokens
 * @param         {User} user - User information
 * @param         {string} reqIssuer - Request issuer
 * @returns       {string} Return a Token
 */
function createToken(user, reqIssuer) {
  const { _id, role } = user;
  const optsSign = Object.assign({}, options.sign, { issuer: reqIssuer, audience: role });
  return jwt.sign({ sub: _id }, keyApi, optsSign);
}

/**
 * @name          getPayloadToken
 * @description   Function to create user tokens
 * @param         {string} token - A token
 * @returns       {Object} Return a Token
 */
function getPayloadToken(token) {
  return jwt.verify(token, keyApi, options.verify, (err, decode) =>
    decode !== undefined ? decode : err,
  );
}

const isValidToken = token => {
  const payload = jwt.verify(token, keyApi, options.verify, (err, decode) =>
    decode !== undefined ? decode : err,
  );
  const hasErrorToken = hasProperty(payload, 'name') && errorsToken.includes(payload.name);
  return hasErrorToken ? false : isValidIdUser(payload.sub);
};

const decodeToken = token => {
  const decoded = new Promise((resolve, reject) => {
    const payload = jwt.verify(token, keyApi, options.verify, (err, decode) =>
      decode !== undefined ? decode : err,
    );
    const hasErrorToken = hasProperty(payload, 'name') && errorsToken.includes(payload.name);
    return hasErrorToken
      ? reject({
          success: false,
          status: 401,
          'status-text': HTTP_STATUS_CODE['401'],
          message: payload.message,
          error: payload.name,
        })
      : !isValidIdUser(payload.sub)
      ? reject({
          success: false,
          status: 401,
          'status-text': HTTP_STATUS_CODE['401'],
          message: 'jwt subject invalid',
          error: 'JsonWebTokenError',
        })
      : resolve({
          success: true,
          status: 200,
          'status-text': HTTP_STATUS_CODE['200'],
          message: 'Valid Token',
          data: payload.sub,
        });
  });
  return decoded;
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const handleToken = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
handleToken.createToken = createToken;
handleToken.getPayloadToken = getPayloadToken;
handleToken.isValidToken = isValidToken;
handleToken.decodeToken = decodeToken;
