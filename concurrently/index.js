//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const concurrently = require('concurrently');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const tasks = require('./tasks');
const middleware = require('./middleware');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ OPTIONS FOR CONCURRENTLY.  ]─────────────────────────────────────────────────────
const options = {
  prefix: 'name',
  prefixLength: 10,
  killOthers: ['failure', 'success'],
  successCondition: 'all',
  restartDelay: 5000,
  restartTries: 3,
};

//  ──[ NODE TASK. ]─────────────────────────────────────────────────────────────────────
const nodeTask = process.env.TASK;

/**
 * NOTE : SET TASK
 * │      set task in package.json for run concurrently script
 * │      "concurrently": "cross-env TASK=TEST && nodemon ./concurrently/index.js",
 */

//  ──[ CHOSEN TASK.  ]──────────────────────────────────────────────────────────────────
const chosenTask = nodeTask ? tasks[nodeTask] : tasks.default;

const through = nodeTask ? `ENVIRONMENT VARIABLES TASK` : 'SCRIPT';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - CONCURRENTLY.                                                   │
//  └───────────────────────────────────────────────────────────────────────────────────┘
concurrently(chosenTask, options).then(
  () => {
    middleware.success(through);
  },
  () => {
    middleware.error(through);
  },
);
