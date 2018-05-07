const { Router } = require('express');
const bodyParser = require('body-parser');
const { noCache } = require('helmet');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('../graph/schema');
const OrganizationContext = require('../context/organization');

const router = Router();

router.use(
  noCache(),
  bodyParser.json(),
  graphqlExpress((req) => {
    const organization = new OrganizationContext(req.get('X-Organization-ID'));
    const context = { organization };
    return { schema, context };
  }),
);

module.exports = router;
