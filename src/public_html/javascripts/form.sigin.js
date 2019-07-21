/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable strict */
// eslint-disable-next-line func-names
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nickName').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('btnSignin').addEventListener('click', clickSignIn);
    document.getElementById('btnSignout').addEventListener('click', clickSignOut);
  });

  function clickSignIn(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = document.getElementById('form-login');
    const validNickname = document.getElementById('nickName').checkValidity();
    const validPassword = document.getElementById('password').checkValidity();

    if (!validNickname || !validPassword) {
      form.classList.add('was-validated');
    } else {
      const nickname = document.getElementById('nickName').value;
      const password = document.getElementById('password').value;
      request.signIn(nickname, password);
    }
  }

  function clickSignOut(event) {
    event.preventDefault();
    event.stopPropagation();
    ui.toggleWelcome();
    if (user.hasLogging()) {
      user.clearLogging();
      ui.toggleWelcome();
    }
  }
})();
