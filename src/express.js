const express = require('express');
const helmet = require('helmet');

const coreRouter = require('./core/router');
const tenantRouter = require('./tenant/router');

const app = express();

app.use(helmet());
app.use(express.static('public'));

app.use('/api/:orgId([A-Za-z0-9-_]{20})', tenantRouter);
app.use('/api', coreRouter);

module.exports = app;
