# Dwolla Webhook Receiver

This sample TypeScript application demonstrates how to create a webhook subscription for Dwolla events, deployed to AWS via Lambda function.

## Setup

This app deploys a webhook handler as an [AWS Lambda](https://aws.amazon.com/lambda/) function using the [Serverless Framework](https://serverless.com/). You can deploy one to your AWS account(s) as follows:

1. Clone the repository and install dependencies with `pnpm install`
2. Rename `.env.example` to `.env`, and update the environment variables
3. Run `pnpm sls:deploy` to create the Lambda function. After it deploys, a publicly accessible HTTP endpoint is logged to the console as `endpoint`. Copy and paste it into the `URL` variable in `scripts/one-time-setup.ts`
4. Run `pnpm hook:setup` to create your Webhook Subscription
5. Run `pnpm hook:create-customer` to create a customer in Dwolla's API
6. Check your Lambda function's logs for `Received customer_created, body=...` with `pnpm sls:logs` (you may have to wait ~15 seconds). It's working!
7. [Optional] To remove the resources in AWS, `pnpm sls:remove`
