import dotenv from "dotenv";
import path from "path";

// Load .env file from project root
dotenv.config({ path: path.join(process.cwd(), ".env") });

// Default config
export default {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL || "",
  jwt: {
    secret: process.env.JWT_SECRET || "changeme",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
  corsOrigin: process.env.CORS_ORIGIN || "*",
  logLevel: process.env.LOG_LEVEL || "info",
};
