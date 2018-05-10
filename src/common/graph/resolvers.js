const { DateType, CursorType } = require('@limit0/graphql-custom-types');

module.exports = {
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
};
