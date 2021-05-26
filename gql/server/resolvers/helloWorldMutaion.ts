import Joi from "@hapi/joi";
import { gql } from "apollo-server-lambda";

import { query } from "gql/client";

const schema = Joi.object({
  message: Joi.string().min(2),
}).options({ abortEarly: false });

const test = gql`
  query {
    
  }
`;

const resolver = {
  Mutation: {
    helloWorldMutation: async (_parent, args) => {
      const {
        value: { message },
        error,
      } = schema.validate(args);
      if (error) {
        return { success: false, message: error.details.map(e => e.message).join(". ") };
      }

      return { success: true, message: `Hello World ${message}` };
    },
  },
};

export default resolver;
