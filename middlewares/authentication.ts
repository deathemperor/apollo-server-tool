import { verifyJWTFromRequest, signJWT } from "utils/jwt";
import { AuthenticationError } from "apollo-server-lambda";
import { get } from "lodash";

const authenticationMiddleware = ({ event }) => {
  try {
    const payload = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": [],
        "x-hasura-default-role": "",
      },
    };
    console.log(signJWT(payload));

    const user = verifyJWTFromRequest(event);
    if (!user.id) {
      if (!user["https://hasura.io/jwt/claims"]) {
        // throw new AuthenticationError("Cannot get HASURA JWT Claims");
      } else {
        user.id = get(user, ["https://hasura.io/jwt/claims", "x-hasura-user-id"]);
      }
    }
    return { user };
  } catch (err) {
    console.log("authenticationMiddleware", err.stack);
    throw new AuthenticationError(err.message);
  }
};

export default authenticationMiddleware;
