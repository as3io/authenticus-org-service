const mongoose = require('../common/mongoose/connection');

const { MONGO_CORE_DSN } = process.env;
const connection = mongoose(MONGO_CORE_DSN);

module.exports = connection;
