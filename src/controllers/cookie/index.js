//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATHS MODULES.  ]────────────────────────────────────────────────────────────────
const services = resolveApp('src/services');

//  ──[ MODULES.  ]──────────────────────────────────────────────────────────────────────
const service = require(services);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { getHTTPStatusText, ServerError } = service;
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      if (req.originalUrl !== '/cookie') {
        throw new ServerError('URL_WRONG');
      }
      const { method } = req;
      const { session } = req;
      const { cookies } = req;
      const { headers } = req;
      const { xhr } = req;
      const complexObject = {
        name: {
          first: 'Barry',
          last: 'Allen',
        },
        employer: 'Central City Police Department',
        country: 'United States',
        skills: ['The Fastest Man Alive', 'Original Flash'],
      };
      req.sessionOptions.path = req.originalUrl;
      req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
      req.session.complexObject = req.session.complexObject
        ? req.session.complexObject
        : complexObject;

      res.status(201).json({
        success: true,
        statusText: getHTTPStatusText('200'),
        message: 'HELLO WORLD',
        method,
        'respose-time': req.requestTime,
        cookies,
        session,
        infoSession: {
          isNew: req.session.isNew,
          isChanged: req.session.isChanged,
          isPopulated: req.session.isPopulated,
        },
        sessionOptions: {
          httpOnly: req.sessionOptions.httpOnly,
          path: req.sessionOptions.path,
        },
        headers,
        xhr,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
