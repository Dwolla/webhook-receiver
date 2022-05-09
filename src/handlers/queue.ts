import { SQSEvent, SQSHandler, SQSRecord } from "aws-lambda";

const parseWebhook = (body: string): any => {
  try {
    return JSON.parse(body);
  } catch (e) {
    throw e;
  }
};

export const queueHandler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  try {
    event.Records.forEach((record: SQSRecord) => {
      const webhook: any = parseWebhook(record.body);
      console.log(`Received ${webhook.topic}, body=${JSON.stringify(webhook, null, 2)}`);
    });
  } catch (e) {
    console.error(`An error occurred while processing the queue: `, e);
  }
};
