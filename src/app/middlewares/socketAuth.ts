// src/middlewares/socketAuth.ts
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config";

interface TokenPayload {
  id: string;
  email: string;
}

export const socketAuth = (socket: Socket, next: (err?: any) => void) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token is required"));
    }

    const payload = jwt.verify(token, config.jwt.accessSecret) as TokenPayload;

    // Attach user info to socket
    socket.data.user = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (err) {
    console.error("Socket auth error:", err);
    next(new Error("Authentication failed"));
  }
};
