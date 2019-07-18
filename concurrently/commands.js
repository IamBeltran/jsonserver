/* eslint-disable prettier/prettier */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  COMMANDS FOR CONCURRENTLY.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const commands = [
  // 0
  {
    command: 'echo "HELLO WORLD"',
    name: '000',
    prefixColor: 'green',
  },
  // 1
  {
    command: 'echo "THIS IS A TASK DEFAULT"',
    name: '001',
    prefixColor: 'blue',
  },
  // 2
  {
    command: 'echo "I AM A TEST"',
    name: '002',
    prefixColor: 'green',
  },
  // 3
  {
    command: 'echo "SOY UNA PRUEBA"',
    name: '003',
    prefixColor: 'blue',
  },
  // 4
  {
    command: 'json-server --config ./src/json/configuration/jsonserver-config.json ./src/json/databases/database.json',
    name: 'SRV',
    prefixColor: 'blue',
  },
  // 5
  {
    command: 'node ./src/server.js',
    name: 'JSR',
    prefixColor: 'blue',
  },
  // 6
  {
    command: 'nodemon ./src/app.js',
    name: 'APP',
    prefixColor: 'green',
  },
];

//  ──[ EXPORT MODULES  ]────────────────────────────────────────────────────────────────
module.exports = commands;
