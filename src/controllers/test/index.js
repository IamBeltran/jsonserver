//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY MODULES DEPENDENCY.                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS-MODULE DEPENDENCIES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATHS MODULES.  ]────────────────────────────────────────────────────────────────
const services = resolveApp('src/services');

//  ──[ MODULES.  ]──────────────────────────────────────────────────────────────────────
const service = require(services);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { ServerError, getHTTPStatusText } = service;

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = async (req, res, next) => {
  // const test = 'EMPY';
  // const test = 'WRONG';
  // const test = 'UNKNOWN';
  const test = 'GOOD';

  try {
    if (test === 'EMPY') {
      throw new ServerError('ERROR_REQUEST_NULL');
    }
    if (test === 'WRONG') {
      throw new ServerError('ERROR_ARGUMENTS_WRONG');
    }
    if (test === 'UNKNOWN') {
      throw new Error();
    }

    res.status(200).json({
      success: true,
      status: 200,
      'status-text': getHTTPStatusText('200'),
      'response-time': req.requestTime,
      message: 'response success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
