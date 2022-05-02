import { getClient } from "./client";

const AWS_LAMBDA_URL = "<YOUR_LAMBDA_ENDPOINT_HERE>";
const WEBHOOK_SUBSCRIPTION_ROUTE = "webhook-subscriptions";

const client = getClient();

/**
 * Check if a webhook subscription already exists for this Lambda URL. If it does, its
 * ID is printed to the console; if it doesn't, a webhook subscription is created using
 * the `WEBHOOK_SECRET` environment variable, and the response is printed to the console.
 */
const runSetup = async () => {
  const currentSubscriptions = await client.get(WEBHOOK_SUBSCRIPTION_ROUTE);
  const subscriptionMatch = currentSubscriptions.body._embedded[WEBHOOK_SUBSCRIPTION_ROUTE].filter(
    (s: any) => s.url === AWS_LAMBDA_URL
  );

  if (subscriptionMatch.length > 0) {
    console.log(`Subscription already exists for this URL, id=${subscriptionMatch[0].id}`);
    return;
  }

  const response = await client.post(WEBHOOK_SUBSCRIPTION_ROUTE, {
    url: AWS_LAMBDA_URL,
    secret: process.env.WEBHOOK_SECRET
  });

  if (response) {
    console.log(`Created ${response.headers.get("Location")}`);
  }
};

runSetup().catch((err) => console.error(err));
