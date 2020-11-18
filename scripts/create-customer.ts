import { error, log } from "@therockstorm/utils"
import "source-map-support/register"
import client, { handleError } from "./client"

const randomStr = () => Math.random().toString(36).substr(2, 10)

const create = async () => {
  const token = await client.auth.client()
  const res = await handleError(() =>
    token.post("customers", {
      email: `${randomStr()}@example.com`,
      firstName: "Webhook",
      lastName: "Test",
      type: "unverified",
    })
  )

  if (res) {
    log(`Created ${res.headers.get("location")}`)
  }
}

create().catch(error)
