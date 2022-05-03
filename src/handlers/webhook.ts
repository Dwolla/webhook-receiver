import crypto from "crypto";
import { SQS } from "aws-sdk";
import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  APIGatewayProxyHandler,
  Context
} from "aws-lambda";

interface Response {
  body: string;
  statusCode: number;
}

const getSqsUrl = (context: Context): string => {
  const region: string = context.invokedFunctionArn.split(":")[3];
  const accountId: string = context.invokedFunctionArn.split(":")[4];
  const queueName: string = "webhookQueue";

  return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
};

const isSignatureValid = (body: string, signature: string): boolean =>
  signature === crypto.createHmac("sha256", process.env.WEBHOOK_SECRET!).update(body).digest("hex");

const response = (statusCode: number, message: string): Response => ({
  body: JSON.stringify({ message }),
  statusCode
});

export const webhookReceiver: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>,
  context: Context
): Promise<Response> => {
  if (!event.body) {
    console.error("Invalid request body");
    return response(400, "Invalid request body");
  }

  const signature = event.headers["X-Request-Signature-SHA-256"];
  console.log(`[${signature}]: Received webhook. Validating request...`);

  if (!signature) {
    console.error("No signature found in request headers");
    return response(400, "No signature found");
  }

  if (!isSignatureValid(event.body, signature)) {
    console.error("Signature from headers could not be validated against secret");
    return response(400, "Invalid signature");
  }

  const sqs: SQS = new SQS();

  try {
    await sqs
      .sendMessage({
        QueueUrl: getSqsUrl(context),
        MessageBody: event.body
      })
      .promise();
  } catch (e) {
    console.error(`[${signature}]: Failed to place webhook in queue for processing`, e);
    return response(500, "Failed to place webhook in queue");
  }

  console.log(`[${signature}]: Webhook was placed in SQS for processing`);
  return response(200, "Success");
};
