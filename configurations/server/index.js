//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  DEFAULT CONSTANTS  ]────────────────────────────────────────────────────────────
const SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:3001';
const SERVER_KEY_API = process.env.SERVER_KEY_API || 'MabelPines565';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULE OF CONFIGURATION  OF SERVER                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ EXPORT MODULE  ]─────────────────────────────────────────────────────────────────
module.exports = {
  SERVER_PORT,
  SERVER_HOSTNAME,
  SERVER_BASE_URL,
  SERVER_KEY_API,
};
