const { resolve } = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');

const typeDefs = importSchema(resolve(__dirname, '../../gql/core.graphql'));

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
