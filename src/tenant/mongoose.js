const mongoose = require('../common/mongoose/connection');

const { MONGO_TENANT_DSN } = process.env;
const connection = mongoose(MONGO_TENANT_DSN);

module.exports = connection;
