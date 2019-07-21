/* eslint-disable strict */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line func-names
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      security.protecPage();
      ui.toggleWelcome();
      if (user.hasLogging()) {
        const userLogging = user.getLogging();
        const { token } = userLogging;
        console.log(`LOGGING USER: ${userLogging.nickname.toUpperCase()}`);

        security.checkToken(token).then(response => {
          ui.toggleWelcome();
          console.log(`AND: ${response.toUpperCase()}`);
        });
      } else {
        console.log('NO LOGGING USER');
      }
    } catch (error) {
      console.log('ERROR: ', error);
    }
  });
})();
