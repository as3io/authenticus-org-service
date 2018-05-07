const { DateType, CursorType } = require('@limit0/graphql-custom-types');
const deepAssign = require('deep-assign');

const organization = require('./organization');
const orgApplication = require('./org/application');

module.exports = deepAssign(organization, orgApplication, {
  Date: DateType,
  Cursor: CursorType,

  /**
   *
   */
  Query: {
    /**
     *
     */
    ping: () => 'pong',
  },
});
