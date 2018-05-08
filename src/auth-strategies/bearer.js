const { Strategy } = require('passport-http-bearer');
const UserService = require('../services/user');

module.exports = new Strategy((token, next) => {
  UserService.retrieveSession(token).then(data => next(null, data)).catch(() => {
    next(new Error('No active user session was found. Did you login?'));
  });
});
