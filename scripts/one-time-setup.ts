import { error, envVar, log } from '@therockstorm/utils'
import client, { handleError } from './client'
import 'source-map-support/register'

const URL = '<Your ServiceEndpoint Here>'
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
  log(`Created ${res.headers.get('location')}`)
}

setup()
