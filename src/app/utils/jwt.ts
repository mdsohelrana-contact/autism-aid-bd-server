import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: object): string => {
  if (!config.jwt.secret) {
    throw new Error("JWT secret is not defined in config");
  }

  const options: SignOptions = { expiresIn: "1d" };
  return jwt.sign(payload, config.jwt.secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
};
