require('dotenv').config();
const pkg = require('../package.json');
const app = require('./express');
const mongoose = require('./mongoose');
const redis = require('./redis');
const errors = require('./errors');

const { coreConnection, tenantConnection } = mongoose;
const { coreClient, tenantClient } = redis;

const { HTTP_PORT } = process.env;
const httpServer = app.listen(HTTP_PORT, () => {
  process.stdout.write(`HTTP server for '${pkg.name}' listening on port ${HTTP_PORT}\n`);
});

// Shutdown app gracefully.
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [
      httpServer.close,
      coreConnection.disconnect,
      tenantConnection.disconnect,
      coreClient.quit,
      tenantClient.quit,
    ];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (e) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (err) errors.report(err);
  if (options.exit) process.exit();
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));

module.exports = { httpServer, mongoose, redis };
