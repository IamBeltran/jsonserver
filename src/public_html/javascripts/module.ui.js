/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const ui = (function() {
  function toggleWelcome() {
    const hasLoggingUser = user.hasLogging();
    const aside = document.getElementById('aside-wrapper');
    const isInvisible = aside.classList.contains('invisible');

    if (hasLoggingUser && isInvisible) {
      aside.classList.remove('invisible');
    }

    if (!hasLoggingUser && !isInvisible) {
      aside.classList.add('invisible');
    }

    if (hasLoggingUser) {
      const userLogging = user.getLogging();
      document.getElementById('small-name').textContent = userLogging.name.toUpperCase();
      document.getElementById(
        'small-nickname',
      ).textContent = userLogging.nickname.toUpperCase();
      document.getElementById('small-level').textContent = userLogging.role.toUpperCase();
    } else {
      document.getElementById('small-name').textContent = null;
      document.getElementById('small-nickname').textContent = null;
      document.getElementById('small-level').textContent = null;
    }
  }

  function showAlertLoggin(err) {
    const alert = document.getElementById('success-login');

    if (
      alert.classList.contains('alert-danger') ||
      alert.classList.contains('alert-success')
    ) {
      alert.classList.remove('alert-danger', 'alert-success');
    }
    if (err) {
      alert.classList.add('alert-danger');
      alert.textContent = `ERROR: ${err.message}`;
    } else {
      alert.classList.add('alert-success');
      alert.textContent = 'SUCCESS SIGN IN';
    }
  }

  function showAlertFile(err) {
    const alert = document.getElementById('success-upload');

    if (
      alert.classList.contains('alert-danger') ||
      alert.classList.contains('alert-success')
    ) {
      alert.classList.remove('alert-danger', 'alert-success');
    }
    if (err) {
      alert.classList.add('alert-danger');
      alert.textContent = `ERROR: ${err.message}`;
    } else {
      alert.classList.add('alert-success');
      alert.textContent = 'SUCCESS UPLOAD FILE';
    }
  }

  return {
    toggleWelcome: toggleWelcome,
    showAlertLoggin: showAlertLoggin,
    showAlertFile: showAlertFile,
  };
})();
