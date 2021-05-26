import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import types from "./typeDefs";
import res from "./resolvers";

export const typeDefs = mergeTypeDefs(types);
export const resolvers = mergeResolvers(res);
