# webhook-receiver

This sample app shows how to create a Dwolla Webhook Subscription and verify its signature. See the [Documentation](https://docsv2.dwolla.com/#webhook-subscriptions) for more details.

## Setup

This app deploys a webhook handler as an [AWS Lambda](https://aws.amazon.com/lambda/) function via the [Serverless Framework](https://serverless.com/). You can deploy one to your AWS account as follows,

1. Clone the repository and install dependencies with `npm install`
1. Export environment variables for your Dwolla Sandbox `DWOLLA_APP_KEY`, `DWOLLA_APP_SECRET`, and `WEBHOOK_SECRET`. If you're not sure what these are, [start here](https://developers.dwolla.com/guides/sandbox-setup/). The `WEBHOOK_SECRET` is explained [here](https://docsv2.dwolla.com/#create-a-webhook-subscription).
1. Run `npm run deploy` to create the Lambda function. After the deploy, a publicly accessible HTTP endpoint is logged to the console as `ServiceEndpoint`. Copy and paste it into the `URL` variable in `one-time-setup.ts`.
1. Run `npm run setup` to create your Webhook Subscription
1. Run `npm run create-customer` to create a customer in Dwolla's API
1. Check your Lambda function's logs for `Received customer_created, body=...`. It's working!
1. [Optional] To remove the resources in AWS, `npm run remove`
