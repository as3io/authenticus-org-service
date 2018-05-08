const passport = require('passport');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('../../graph/schema');
const Auth = require('../../context/auth');

const authenticate = (req, res, next) => {
  passport.authenticate('core-bearer', { session: false }, (err, { user, session } = {}) => {
    req.auth = Auth({ user, session, err });
    next();
  })(req, res, next);
};

module.exports = (router) => {
  router.use(
    '/',
    authenticate,
    graphqlExpress((req) => {
      const { auth } = req;
      const context = { auth };
      return { schema, context };
    }),
  );
};
