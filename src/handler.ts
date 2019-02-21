import { envVar, error, log } from '@therockstorm/utils'
import { APIGatewayProxyHandler } from 'aws-lambda'
import crypto from 'crypto'
import 'source-map-support/register'

const WEBHOOK_SECRET = envVar('WEBHOOK_SECRET')

const response = (statusCode: number, message: string) => ({
  body: JSON.stringify({ message }),
  statusCode
})

const isSignatureValid = (body: string, signature: string) =>
  signature ===
  crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

export const handle: APIGatewayProxyHandler = async evt => {
  if (!evt.body) {
    return response(400, 'Invalid request body.')
  }

  const signature = evt.headers['X-Request-Signature-SHA-256']
  if (!signature) {
    return response(400, 'No signature.')
  }

  if (!isSignatureValid(evt.body, signature)) {
    return response(400, 'Invalid signature.')
  }

  let webhook
  try {
    webhook = JSON.parse(evt.body)
  } catch (e) {
    return response(400, 'Invalid JSON.')
  }

  log(`Received ${webhook.topic}, body=${JSON.stringify(webhook, null, 2)}`)
  return response(200, 'Success!')
}

process.on('unhandledRejection', e => error('unhandledRejection', e))
