import dotenv from "dotenv";
dotenv.config();
const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "somethingsecret",
};

export default config;
