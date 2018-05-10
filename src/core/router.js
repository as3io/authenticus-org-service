const { Router } = require('express');
const { noCache } = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('./graph/schema');
const Auth = require('./context/auth');

const authenticate = (req, res, next) => {
  passport.authenticate('core-bearer', { session: false }, (err, { user, session } = {}) => {
    req.auth = Auth({ user, session, err });
    next();
  })(req, res, next);
};


const router = Router();

router.use(
  noCache(),
  bodyParser.json(),
  authenticate,
  graphqlExpress((req) => {
    const { auth } = req;
    const context = { auth };
    return { schema, context };
  }),
);

module.exports = router;
