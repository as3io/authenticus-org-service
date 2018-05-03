const express = require('express');
const helmet = require('helmet');
const loadRoutes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.static('public'));

loadRoutes(app);

module.exports = app;
