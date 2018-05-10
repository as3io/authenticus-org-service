const express = require('express');
const helmet = require('helmet');
const passport = require('passport');

const coreBearer = require('./core/auth-strategies/bearer');

const coreRouter = require('./core/router');
const tenantRouter = require('./tenant/router');

passport.use('core-bearer', coreBearer);

const app = express();

app.use(helmet());
app.use(passport.initialize());
app.use(express.static('public'));

app.use('/api/:tenantId([A-Za-z0-9-_]{20})', tenantRouter);
app.use('/api', coreRouter);

module.exports = app;
