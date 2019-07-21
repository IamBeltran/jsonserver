/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const security = (function() {
  const BASE_URL = 'http://localhost:3001';
  const INDEX_URL = `${BASE_URL}/index.html`;
  const VERIFY_TOKEN_URL = `${BASE_URL}/auth/token`;

  function getCurrentLocation() {
    return window.location.pathname.replace('.html', '');
  }

  function setAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }

  function checkToken(token) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Credentials', 'true');

    return fetch(VERIFY_TOKEN_URL, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: headers,
      withCredentials: true,
      credentials: 'include',
    })
      .then(response => util.checkStatus(response))
      .then(response => {
        return response.message;
      })
      .catch(err => {
        user.clearUserLogging();
        redirect();
        return err.message;
      });
  }

  function protecPage() {
    const currentLocation = getCurrentLocation();
    const userLogging = user.hasLogging();
    if (currentLocation !== '/index' && !userLogging) {
      redirect();
    }
  }

  function redirect() {
    window.location = INDEX_URL;
  }

  return {
    getCurrentLocation,
    setAuthHeader,
    redirect,
    protecPage,
    checkToken,
  };
})();
