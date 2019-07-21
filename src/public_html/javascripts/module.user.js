/* eslint-disable strict */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable func-names */

'use strict';

const user = (function() {
  function getLoggingUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  function setLoggingUser(user) {
    localStorage.setItem('user', JSON.stringify({ user }));
  }

  function clearLoggingUser() {
    localStorage.removeItem('user');
  }

  function hasLoggingUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token;
  }

  return {
    getLogging: getLoggingUser,
    setLogging: setLoggingUser,
    clearLogging: clearLoggingUser,
    hasLogging: hasLoggingUser,
  };
})();
