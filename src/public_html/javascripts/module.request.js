/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable strict */

'use strict';

const request = (function() {
  function signIn(nickname, password) {
    const headers = new Headers();
    const url = '/auth/signin';

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Credentials', 'true');

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        nickname: nickname,
        pass: password,
        origin: location.origin,
      }),
      headers: headers,
      withCredentials: true,
      credentials: 'include',
    })
      .then(response => util.checkStatus(response))
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));

          const userLogging = user.getLogging();
          console.log(`USER HAS LOGGING: ${userLogging.nickname.toUpperCase()}`);
          ui.toggleWelcome();
          ui.showAlertLoggin();
        }
      })
      .catch(err => {
        console.log(`ERROR: ${err.message.toUpperCase()}`);
        ui.showAlertLoggin(err);
      });
  }

  function uploadFile(filename, file) {
    const formdata = new FormData();
    const headers = new Headers();
    const url = '/upload';

    formdata.append('filename', filename);
    formdata.append('file', file);

    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Credentials', 'true');

    fetch(url, {
      method: 'POST',
      body: formdata,
      headers: headers,
      withCredentials: true,
      credentials: 'include',
    })
      .then(response => util.checkStatus(response))
      .then(response => {
        if (response.data) {
          console.log(response.data);
          ui.showAlertFile();
        }
      })
      .catch(err => {
        console.log('ERROR: ', err.message);
        ui.showAlertFile(err);
      });
  }

  return {
    signIn: signIn,
    uploadFile: uploadFile,
  };
})();
