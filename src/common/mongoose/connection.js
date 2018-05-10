const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

module.exports = (dsn) => {
  const connection = mongoose.createConnection(dsn, {
    // autoIndex: process.env.NODE_ENV !== 'production',
    ignoreUndefined: true,
    promiseLibrary: bluebird,
  });
  connection.once('open', () => process.stdout.write(`Successful MongoDB connection to '${dsn}'\n`));
  return connection;
};
