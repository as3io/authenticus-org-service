const { Router } = require('express');
const bodyParser = require('body-parser');
const { noCache } = require('helmet');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('../graph/schema');

const router = Router();

router.use(
  noCache(),
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
    context: {},
  })),
);

module.exports = router;
