//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const jsonserver = require('json-server');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const methodOverride = require('method-override');
const openBrowsers = require('open-browsers');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATH MODULES.  ]─────────────────────────────────────────────────────────────────
const configurations = resolveApp('configurations');
const middlewares = resolveApp('src/middlewares');
const services = resolveApp('src/services');
const controllers = resolveApp('src/controllers');

//  ──[ REQUIRE MODULES.  ]──────────────────────────────────────────────────────────────
const configuration = require(configurations);
const middleware = require(middlewares);
const service = require(services);
const controller = require(controllers);
const apiRouter = require('./jsonserver-routes');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { logger, getHTTPStatusText } = service;
const {
  SERVER: { SERVER_PORT: serverPort, SERVER_HOSTNAME: hostName },
} = configuration;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ ALLOW URLS.  ]───────────────────────────────────────────────────────────────────
const allowUrls = ['/', '/api/users', '/auth/signin', '/auth/token', '/test', '/cookie'];

//  ──[ ENVIRONMENT VARIABLES.  ]────────────────────────────────────────────────────────
const environment = process.env.NODE_ENV;
const isDev = environment !== 'production';

//  ──[ PATH PUBLIC.  ]──────────────────────────────────────────────────────────────────
const pathFavicon = resolveApp('src/public_html/images/favicon/favicon.ico');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ INSTANT JSON-server.                                                              │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const server = jsonserver.create();
const datatabase = jsonserver.router('./src/json/databases/database.json');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MIDDLEWARES.                                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ MIDDLEWARES DEFAULTS  ]──────────────────────────────────────────────────────────
server.use(middleware.defaults);

//  ──[ MIDDLEWARES HTTP REQUEST LOGGER  ]───────────────────────────────────────────────
server.use(middleware.loggerRequest.error);
server.use(middleware.loggerRequest.success);

//  ──[ MIDDLEWARES PARSE DATA.  ]───────────────────────────────────────────────────────
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//  ──[ MIDDLEWARES STATIC.  ]───────────────────────────────────────────────────────────
server.use(favicon(pathFavicon));
server.use(middleware.requestTime);

//  ──[ MIDDLEWARES SECURITY.  ]─────────────────────────────────────────────────────────
server.use(methodOverride());
server.use(helmet());
server.use(middleware.session);
server.use(middleware.isAuth(allowUrls));

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ROUTES.                                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.use('/test', controller.test);
server.use('/cookie', controller.cookie);
server.use('/auth/signin', controller.signin);
server.use('/auth/token', controller.token);
server.use('/api/users', controller.users);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ERROR HANDLER.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ CATCH 404.  ]────────────────────────────────────────────────────────────────────
//  HANDLE NOT SPECIFIED ROUTES
//  server.use( (req, res, next) => { next( createError(404)) });
//  const errorHtml = resolveApp('src/public_html/error.html');
//  const createError = require('http-errors');

//  ──[ FORWARD TO ERROR HANDLER.  ]─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorName = err.name === 'Error' ? 'ERROR_IN_SERVER' : err.name;

  logger.showError(err, `API ${req.originalUrl}`);

  return res.status(status).send({
    success: false,
    status,
    'status-text': getHTTPStatusText(`${status}`),
    'response-time': req.requestTime,
    message: err.message || 'An unknown error in server',
    error: errorName,
  });
});

server.use(jsonserver.rewriter(apiRouter));
server.use(datatabase);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ STARTING THE SERVER.                                                              │
//  └───────────────────────────────────────────────────────────────────────────────────┘
server.listen(serverPort, () => {
  logger.serverStarted(serverPort, environment, hostName);
  if (!isDev) {
    openBrowsers(`http://${hostName}:${serverPort}`);
  }
});
