//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.																									│
//	└───────────────────────────────────────────────────────────────────────────────────┘
const moment = require('moment');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - MIDDLEWARE - REQUEST TIME.                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const requestTime = (req, res, next) => {
  req.requestTime = moment()
    .locale('es-us')
    .format('YYYY-MM-YYYY, hh:mm:ss a');
  next();
};

//	──[	EXPORT MODULE	]──────────────────────────────────────────────────────────────────
module.exports = requestTime;
