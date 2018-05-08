const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const authStrategies = require('./auth-strategies');
const loadRoutes = require('./routes');

passport.use('core-bearer', authStrategies.bearer);

const app = express();

app.use(passport.initialize());
app.use(helmet());
app.use(express.static('public'));

loadRoutes(app);

module.exports = app;
