import { envVar, log } from '@therockstorm/utils'
import 'source-map-support/register'
import client, { handleError } from './client'

const URL = 'https://5vurtdx5ff.execute-api.us-west-2.amazonaws.com/local'
const WEBHOOK_SECRET = envVar('WEBHOOK_SECRET')
const ROUTE = 'webhook-subscriptions'

const setup = async () => {
  const token = await client.auth.client()
  const subs = await token.get(ROUTE)
  const match = subs.body._embedded[ROUTE].filter((s: any) => s.url === URL)
  if (match.length > 0) {
    log(`Subscription already exists for this URL, id=${match[0].id}`)
    return
  }

  const res = await handleError(() =>
    token.post(ROUTE, { url: URL, secret: WEBHOOK_SECRET })
  )
  if (res) {
    log(`Created ${res.headers.get('location')}`)
  }
}

setup()
