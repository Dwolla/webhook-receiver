import { envVar, error } from "@therockstorm/utils"
import dwolla from "dwolla-v2"

export default new dwolla.Client({
  environment: "sandbox",
  key: envVar("DWOLLA_APP_KEY"),
  secret: envVar("DWOLLA_APP_SECRET")
  // In production app, save token to your database for reuse
  // onGrant: (token) => new Promise(...)
})

export const handleError = async (func: () => any) => {
  try {
    return await func()
  } catch (e) {
    error(JSON.stringify(e, null, 2))
  }
}
