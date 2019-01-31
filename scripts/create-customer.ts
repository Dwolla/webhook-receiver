import { log } from '@therockstorm/utils'
import client, { handleError } from './client'
import 'source-map-support/register'

const randomStr = () =>
  Math.random()
    .toString(36)
    .substr(2, 10)

const create = async () => {
  const token = await client.auth.client()
  const res = await handleError(() =>
    token.post('customers', {
      firstName: 'Webhook',
      lastName: 'Test',
      email: `${randomStr()}@example.com`,
      type: 'unverified'
    })
  )

  if (res) log(`Created ${res.headers.get('location')}`)
}

create()
