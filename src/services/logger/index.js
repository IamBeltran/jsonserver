/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-console */

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const colors = require('ansi-colors');
const ip = require('ip');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { red, yellow, cyan, bold, blue } = colors;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// const checkMarkX = colors.red('[✘]');
const checkMarkV = colors.green('[✓]');
const line = colors.gray('--------------------------------------------------------');
// const lineN = colors.gray('--------------------------------------------------------\n');
const Nline = colors.gray('\n--------------------------------------------------------');
// const NlineN = colors.gray('\n--------------------------------------------------------\n');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  SET MIDDLEWARES.                                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

/**
 *
 * @name          showError
 * @description   Middleware for show errors
 * @param         {Error} error - Error for display
 * @param         {string} [context='CODE'] - Context where error occurs
 */
function showError(error, context = 'CODE') {
  const text1 = 'ERROR IN:'.padStart(10);
  const text2 = 'NAME:'.padStart(10);
  const text3 = 'MESSAGE:'.padStart(10);
  const text4 = 'ADD INFO:'.padStart(10);
  const text5 = 'STACK:'.padStart(10);
  const { name, message, stack, ...rest } = error;

  console.error(red(`${text1} ${context}`));
  if (name) {
    console.error(red(`${text2} ${name}`));
  }
  if (message) {
    console.error(red(`${text3} ${message}`));
  }
  if (Object.entries(rest).length !== 0 && rest.constructor === Object) {
    console.error(red(`${text4} \u2935${Nline}`));
    console.error(red(`${JSON.stringify(rest, null, 3)}${Nline}`));
  }
  if (stack) {
    const onlyStack = stack.replace(`${error.name}: ${error.message}\n`, '');
    console.error(red(`${text5} \u2935${Nline}`));
    console.error(red(`${onlyStack}${Nline}`));
  }
}

/**
 *
 * @name          showWarning
 * @description   Middleware for show Warnings
 * @param         {Error} warning - Warning for display
 * @param         {string} [context='CODE'] - Context where warning occurs
 */
function showWarning(warning, context = 'CODE') {
  const text1 = 'WARNING IN:'.padStart(12);
  const text2 = 'NAME:'.padStart(12);
  const text3 = 'MESSAGE:'.padStart(12);
  const text4 = 'STACK:'.padStart(12);

  console.warn(yellow(`${text1} ${context}`));
  if (warning.name) {
    const { name } = warning;
    console.warn(yellow(`${text2} ${name}`));
  }
  if (warning.message) {
    const { message } = warning;
    console.warn(yellow(`${text3} ${message}`));
  }
  if (warning.stack) {
    let { stack } = warning;
    stack = stack.replace(`${warning.name}: ${warning.message}\n`, '');
    console.warn(yellow(`${text4} \u2935${Nline}`));
    console.warn(yellow(`${stack}${Nline}`));
  }
}

function newUser(newUserObjet) {
  console.log(`${cyan(`→ NEW USER SAVE:`)}`);
  console.log(`${cyan(`${JSON.stringify(newUserObjet, null, 2)}`)}`);
}

function serverStarted(port, environment, hostname) {
  const text1 = '¡JSON-SERVER STARTED!'.padStart(22);
  const text2 = 'APP IN ENVIRONMENT:'.padStart(22);
  const text3 = 'NUMBER THE PORT:'.padStart(22);
  const text4 = 'INFO SERVER:'.padStart(22);
  const text5 = 'ACCESS URLS:'.padStart(22);
  const text6 = 'LOCALHOST:'.padStart(22);
  const text7 = 'LAN:'.padStart(22);

  console.log(`${line}`);
  console.log(`${cyan(`${text1}`)}\t${blue(`${checkMarkV}`)}`);
  console.log(`${line}`);
  console.log(`${bold(`${text4}`)}`);
  console.log(`${line}`);
  console.log(`${text2}\t${blue(`${environment.toUpperCase()}`)}`);
  console.log(`${text3}\t${blue(`${parseInt(port, 10)}`)}`);
  console.log(`${line}\n`);
  console.log(`${bold(`${text5}`)}`);
  console.log(`${line}`);
  console.log(`${text6}\t${blue(`http://${hostname}:${port}`)}`);
  console.log(`${text7}\t${blue(`http://${ip.address()}:${port}`)}`);
  console.log(`${line}`);
}

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const logger = (module.exports = exports = {});

logger.showError = showError;
logger.showWarning = showWarning;
logger.newUser = newUser;
logger.serverStarted = serverStarted;
