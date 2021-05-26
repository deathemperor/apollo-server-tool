import jwt from "jsonwebtoken";
import privateKey from "./jwtRS512.key";
import publicKey from "./jwtRS512.key.pub";
import { AuthenticationError } from "apollo-server-lambda";

interface SignJWTOption {
  expiresIn?: string;
}

export const verifyJWT = (token): {} =>
  jwt.verify(token, publicKey, {
    algorithms: ["RS512"],
  });

export const getBearerToken = ({ headers }) => {
  const Authorization = headers.Authorization || headers.authorization;
  const XAuthorization = headers["X-Authorization"] || headers["x-authorization"];

  if (!Authorization && !XAuthorization) {
    throw new AuthenticationError("No authorization");
  }
  if (Authorization) return Authorization.split(" ")[1];
  return XAuthorization.split(" ")[1];
};

export const verifyJWTFromRequest = (req): { id?: string } => {
  const token = getBearerToken(req);
  return verifyJWT(token);
};

export const signJWT = (payload, options: SignJWTOption = {}) => {
  const { expiresIn = "1000 days" } = options;
  return jwt.sign(payload, privateKey, {
    expiresIn,
    issuer: "papaya.asia",
    audience: "papaya.asia",
    algorithm: "RS512",
  });
};

export const encodeJWT = payload =>
  jwt.sign(payload, privateKey, {
    algorithm: "RS512",
  });

export const decodeJWT = payload =>
  jwt.verify(payload, privateKey, {
    algorithms: ["RS512"],
  });
