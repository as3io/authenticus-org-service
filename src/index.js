require('dotenv').config();
const pkg = require('../package.json');
const app = require('./express');

const { HTTP_PORT } = process.env;

const httpServer = app.listen(HTTP_PORT, () => {
  process.stdout.write(`HTTP server for '${pkg.name}' listening on port ${HTTP_PORT}\n`);
});

module.exports = { httpServer };
