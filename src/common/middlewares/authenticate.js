const passport = require('passport');
const Auth = require('../context/auth');

module.exports = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, { user, session } = {}) => {
    req.auth = Auth({ user, session, err });
    next();
  })(req, res, next);
};
