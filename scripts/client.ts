import { Client } from "dwolla-v2";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Fetch the Dwolla Client using `dwolla-v2`. To learn more about our SDK,
 * visit the following link: https://developers.dwolla.com/api-reference/sdks/node-js
 */
export const getClient = () =>
  new Client({
    environment: "sandbox",
    key: process.env.DWOLLA_APP_KEY!,
    secret: process.env.DWOLLA_APP_SECRET!
  });
