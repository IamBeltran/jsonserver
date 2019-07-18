/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const colors = require('ansi-colors');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { red, green, gray } = colors;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const checkX = red('[✘]');
const checkV = green('[✓]');
const error = colors.bold.red;
const success = colors.bold.green;
const line = gray('----------------------------------------------------');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - MIDDLEWARE.                                                     │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const middleware = {
  error: through => {
    console.log(`${error(`${line}`)}`);
    console.log(`${error(`● FAILURE - DO NOT COMPLETE THE TASKS o(*_*)o    ${checkX}`)}`);
    console.log(`${error(`● EXECUTION OF CONCURRENTLY FAILURE, THROUGH ${through}`)}`);
    console.log(`${line}`);
  },
  success: through => {
    console.log(`${success(`${line}`)}`);
    console.log(`${success(`● SUCCESS - COMPLETE THE TASKS o(^-^)o           ${checkV}`)}`);
    console.log(`${success(`● RUN CONCURRENTLY THROUGH ${through}`)}`);
    console.log(`${line}`);
  },
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = middleware;
