import { ApolloServer } from "apollo-server-lambda";

import authenticationMiddleware from "middlewares/authentication";
import { typeDefs, resolvers } from "gql/server";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/dev/graphql",
  },
  introspection: true,
  context: authenticationMiddleware,
});

export const graphql = server.createHandler();
