const { DateType, CursorType } = require('@limit0/graphql-custom-types');
const deepAssign = require('deep-assign');

const organization = require('./organization');

module.exports = deepAssign(organization, {
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
