const { Router } = require('express');
const { noCache } = require('helmet');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('./graph/schema');
const authenticate = require('../common/middlewares/authenticate');

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
