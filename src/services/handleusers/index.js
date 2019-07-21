/* eslint-disable no-underscore-dangle */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const bcrypt = require('bcryptjs');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const fs = require('fs');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const databasePath = './src/json/databases/database.json';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const database = JSON.parse(fs.readFileSync(databasePath, 'UTF-8'));
const { users } = database;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @name          isValidUser
 * @description   Function that checks if a user is valid
 * @param         {string} nickname - User nickname
 * @param         {string} pass - User pass
 * @returns       {Boolean} true if user is valid or false if not valid
 */
function isValidUser({ nickname, pass }) {
  return (
    users.findIndex(user => {
      return user.nickname === nickname && bcrypt.compareSync(pass, user.pass);
    }) !== -1
  );
}

/**
 * @name          existsUser
 * @description   Function that checks if a user exists
 * @param         {string} nickname - User nickname
 * @returns       {Boolean} true if user exists or false if not exists
 */
function existsUser(nickname) {
  return (
    users.findIndex(user => {
      return user.nickname === nickname;
    }) !== -1
  );
}

/**
 * @name          isValidIdUser
 * @description   Function that checks if a user id is valid
 * @param         {number} id - User id
 * @returns       {Boolean} True if user id is valid or false if not valid
 */
function isValidIdUser(_id) {
  return (
    users.findIndex(user => {
      return user._id === _id;
    }) !== -1
  );
}

/**
 * @typedef       {Object} User
 * @property      {string} nickname - User Nickname
 * @property      {string} role     - User role
 * @property      {string} name     - User name
 * @property      {number} _id      - User id
 * @property      {string} status   - User status
 */

/**
 * @name          searchUser
 * @description   Function that searches a user in a database with your nickname.
 * @param         {string} nickName - User Nickname
 * @returns       {User|null} User information or null if not matches
 */
function searchUser(nickName) {
  const match = users.filter(user => {
    return user.nickname === nickName;
  });
  const hasMatch = match.length !== 0;
  if (!hasMatch) {
    return null;
  }
  const user = match[0];
  const { nickname, role, name, _id, status } = user;
  return { nickname, role, name, _id, status };
}

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const handleUsers = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// Main Modules
handleUsers.searchUser = searchUser;
handleUsers.isValidIdUser = isValidIdUser;
handleUsers.existsUser = existsUser;
handleUsers.isValidUser = isValidUser;
