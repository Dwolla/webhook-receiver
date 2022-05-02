import type { APIGatewayProxyHandler } from "aws-lambda";
import crypto from "crypto";

const response = (statusCode: number, message: string) => ({
  body: JSON.stringify({ message }),
  statusCode
});

const isSignatureValid = (body: string, signature: string) =>
  signature === crypto.createHmac("sha256", process.env.WEBHOOK_SECRET!).update(body).digest("hex");

export const handle: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return response(400, "Invalid request body.");
  }

  const signature = event.headers["X-Request-Signature-SHA-256"];

  if (!signature) {
    return response(400, "No signature.");
  }

  if (!isSignatureValid(event.body, signature)) {
    return response(400, "Invalid signature.");
  }

  let webhook;

  try {
    webhook = JSON.parse(event.body);
  } catch (e) {
    return response(400, "Invalid JSON.");
  }

  console.log(`Received ${webhook.topic}, body=${JSON.stringify(webhook, null, 2)}`);
  return response(200, "Success!");
};

process.on("unhandledRejection", (e) => {
  throw e;
});
