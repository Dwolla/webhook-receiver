import { envVar, error, log } from '@therockstorm/utils'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import crypto from 'crypto'
import 'source-map-support/register'

const WEBHOOK_SECRET = envVar('WEBHOOK_SECRET')

const response = (statusCode: number, message: string) => ({
  statusCode,
  body: JSON.stringify({ message })
})

const isSignatureValid = (body: string, signature: string) =>
  signature ===
  crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

export const handle: APIGatewayProxyHandler = async (
  evt: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!evt.body) return response(400, 'Invalid request body.')

  const signature = evt.headers['X-Request-Signature-SHA-256']
  if (!signature) return response(400, 'No signature')

  if (!isSignatureValid(evt.body, signature))
    return response(400, 'Invalid signature')

  try {
    const webhook = JSON.parse(evt.body)
    log(`Received ${webhook.topic}`)
  } catch (e) {
    return response(400, 'Invalid JSON.')
  }

  return response(200, 'Success!')
}

process.on('unhandledRejection', e => error('unhandledRejection', e))
