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
    accessSecret: process.env.JWT_ACCESS_SECRET || "changeme-access",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "changeme-refresh",
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  cloudinary:{
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  corsOrigin: process.env.CORS_ORIGIN || "*",
  logLevel: process.env.LOG_LEVEL || "info",
};
