# Dwolla Webhook Receiver

This sample TypeScript application demonstrates how to create a webhook subscription for Dwolla events, deployed to AWS via Lambda function.

## Setup

This app deploys a webhook handler as an [AWS Lambda](https://aws.amazon.com/lambda/) function using the [Serverless Framework](https://serverless.com/). You can deploy one to your AWS account(s) as follows:

NOTE: Any `pnpm` command can be replaced with `npm`.

1. Clone the repository and install dependencies with `pnpm install`
2. Rename `.env.example` to `.env`, and update the environment variables
3. Run `pnpm sls:deploy` to create the Lambda functions. After they deploy, a publicly accessible HTTP endpoint is logged to the console as `endpoint`. Copy and paste it into the `URL` variable in `scripts/one-time-setup.ts`
4. Run `pnpm hook:setup` to create your Webhook Subscription
5. Run `pnpm hook:create-customer` to create a customer in Dwolla's API
6. Check your webhook function's logs by running `pnpm sls:logs:webhook`. You should see a message indicating that the webhook has been moved to your SQS queue for processing.
7. Check your SQS function's logs by running `pnpm sls:logs:queue`. You should see the contents of the webhook after it has been parsed.
9. [Optional] To remove the resources in AWS, run `pnpm sls:remove`
