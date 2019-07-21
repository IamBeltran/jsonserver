/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable strict */

'use strict';

const util = (function() {
  function checkStatus(response) {
    return response.json().then(json => {
      if (json.success) {
        return json;
      } else {
        return Promise.reject(json);
      }
    });
  }

  return {
    checkStatus,
  };
})();
