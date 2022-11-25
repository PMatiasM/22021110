import dotenv from "dotenv";
dotenv.config();

const MONGO_DATABASE = process.env.MONGO_DATABASE || "";
const MONGO_URL = process.env.MONGO_URL || "";
const SERVER_PORT = process.env.SERVER_PORT ?? "3141";

export const config = {
  mongo: {
    database: MONGO_DATABASE,
    url: MONGO_URL,
  },
  server: {
    port: Number(SERVER_PORT),
  },
};
