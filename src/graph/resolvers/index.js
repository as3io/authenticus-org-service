const { DateType, CursorType } = require('@limit0/graphql-custom-types');
const deepAssign = require('deep-assign');

const organization = require('./organization');
const user = require('./user');
const orgApplication = require('./org/application');

module.exports = deepAssign(organization, user, orgApplication, {
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
