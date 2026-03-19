import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT:           process.env.PORT           || 3000,
  APP_ID:         process.env.APP_ID,
  REDIRECT_URI:   process.env.REDIRECT_URI,
  SESSION_SECRET: process.env.SESSION_SECRET || "nexora_secret",
  FRONTEND_URL:   process.env.FRONTEND_URL   || "http://localhost:3000",
  NODE_ENV:       process.env.NODE_ENV       || "development",
};
